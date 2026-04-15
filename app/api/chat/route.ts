import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history } = body;

    console.log("[CHAT_API] key present:", !!process.env.GEMINI_API_KEY);
    console.log("[CHAT_API] key length:", process.env.GEMINI_API_KEY?.length);

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const safeHistory = Array.isArray(history) ? history : [];

    const SYSTEM_PROMPT =
      process.env.GEMINI_SYSTEM_PROMPT ??
      "You are a helpful assistant answering questions about Johan Suarez, a software developer.";

    async function callGeminiWithRetry(
      modelName: string,
      chatHistory: Array<{role: string, parts: Array<{text: string}>}>,
      message: string,
      maxRetries: number = 3
    ): Promise<string> {
      let lastError: Error | null = null;
      
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: {
              role: "system",
              parts: [{ text: SYSTEM_PROMPT }]
            },
            generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
          });
          const chat = model.startChat({ history: chatHistory });
          const result = await chat.sendMessage(message);
          return result.response.text();
        } catch (error) {
          lastError = error as Error;
          const errorMsg = lastError.message || "";
          
          // Solo reintentar en errores temporales (503, 429, 500)
          const isTransient = errorMsg.includes("503") || 
                              errorMsg.includes("429") || 
                              errorMsg.includes("500") ||
                              errorMsg.includes("UNAVAILABLE");
          
          if (!isTransient) throw lastError;
          
          // Delay exponencial antes del siguiente intento
          if (attempt < maxRetries - 1) {
            const delay = Math.pow(2, attempt) * 500;
            console.log(`[CHAT_API] ${modelName} failed (${errorMsg.slice(0, 60)}), retry ${attempt + 1} in ${delay}ms`);
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
      
      throw lastError || new Error("All retries exhausted");
    }

    let reply: string;
    try {
      reply = await callGeminiWithRetry("gemini-2.5-flash", safeHistory, message);
    } catch (primaryError) {
      console.log("[CHAT_API] primary model exhausted, trying fallback");
      try {
        reply = await callGeminiWithRetry("gemini-2.5-flash-lite", safeHistory, message, 1);
      } catch (fallbackError) {
        console.error("[CHAT_API_ERROR] both models failed", {
          primary: (primaryError as Error).message,
          fallback: (fallbackError as Error).message
        });
        return NextResponse.json(
          { error: "System temporarily unavailable. Please try again." },
          { status: 503 }
        );
      }
    }
    
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("[CHAT_API_ERROR]", {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });
    return NextResponse.json({ error: "System error. Try again." }, { status: 500 });
  }
}
