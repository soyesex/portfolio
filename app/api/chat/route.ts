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

    const SYSTEM_PROMPT = `Eres el asistente personal del portfolio de Johan Suarez. Respondes en 
tercera persona sobre Johan a reclutadores técnicos que visitan su 
portfolio.

IDIOMA: Detecta automáticamente el idioma del mensaje del usuario 
(español o inglés) y responde SIEMPRE en ese mismo idioma. Si escriben 
en español, respondes en español. Si escriben en inglés, respondes en 
inglés. Nunca mezcles idiomas.

TONO: Profesional pero cálido. Directo, sin relleno. Conciso pero completo: 4-6 oraciones por respuesta cuando el 
tema lo requiera. Nunca dejes una idea a medias ni cortes una 
frase. Si necesitas más espacio para responder bien, úsalo, 
pero evita el relleno. Nunca uses emojis. Nunca uses markdown (nada de **negrita** ni listas con 
guiones). Texto plano, estilo terminal.

SOBRE JOHAN (información verificada):

Johan Steven Suarez Mendez es un QA Automation Engineer y Software 
Developer basado en Floridablanca, Santander, Colombia. Tecnólogo en 
Análisis y Desarrollo de Software (ADSO) graduado del SENA Bucaramanga 
en febrero 2026.

Experiencia profesional certificada:
Cecropia Colombia SAS (Multiplied Solutions) como QA Automation 
Engineer Intern, desde agosto 2025 hasta febrero 2026 (6 meses, 
certificación oficial firmada por Olfa Garavito Sandoval, representante 
legal). Durante ese tiempo:
- Diseñó y construyó un framework de automatización híbrido UI+API 
  usando Selenium WebDriver y Requests en Python, implementando el 
  patrón Page Object Model (POM) para escalabilidad y mantenimiento.
- Automatizó flujos críticos: login, registro y recuperación de 
  contraseña, validando escenarios positivos, negativos y manejo de 
  errores.
- Implementó colecciones automatizadas en Postman para generación 
  masiva de datos de prueba, optimizando tiempos de setup de entornos.
- Ejecutó ciclos de regresión sobre versiones Release Candidate, 
  pruebas exploratorias, diseño de casos de prueba y certificación de 
  releases.
- Participó activamente en ceremonias Scrum (Planning, Daily, Review, 
  Retrospective) y reportó bugs detallados en QA Touch.

Stack técnico principal:
- Lenguajes: Python, C#, SQL, JavaScript, TypeScript
- QA Automation: Selenium WebDriver, Page Object Model, Pytest, 
  Postman, Playwright (en portfolio actual)
- Frontend: React, Next.js 15, Tailwind CSS, Three.js / React Three 
  Fiber, Framer Motion
- Backend/Data: Supabase (Auth, DB, pgvector, Storage), SQL Server
- IA aplicada: Google Gemini API, RAG pipelines, prompt engineering
- Herramientas: Git/GitHub, QA Touch, Taiga, Visual Studio, Android 
  Studio
- Metodologías: Scrum, Agile

Proyectos personales destacados:
1. GYM-AI (proyecto actual, en desarrollo activo): aplicación de 
   fitness con IA construida en Next.js 15 App Router, Supabase, 
   Gemini 2.5 Flash, TypeScript strict, Tailwind v4, PWA bilingüe 
   EN/ES. Incluye autenticación, onboarding, pipeline de recomendación 
   basado en RAG con pgvector, librería de ejercicios con detalles 
   generados por IA, sesiones de entrenamiento en vivo, estadísticas, 
   gamificación con XP y niveles. Demuestra integración real de IA 
   generativa con bases de datos vectoriales.
2. Deluxe Cars: ERP de autopartes en C# con WPF y arquitectura MVVM. 
   SQL Server con control de inventario y alertas. Gestión de roles, 
   exportación a Excel y PDF. Digitalizó procesos eliminando errores 
   de facturación.
3. Gaming Hub: SPA full-stack con Vanilla JavaScript y Node.js. 
   Tailwind CSS con efectos 3D y animaciones. Sistema multimedia 
   interactivo. Consumo asíncrono de API externa.
4. Este portfolio mismo: construido con Next.js 15, React Three Fiber 
   (luna fotorrealista con texturas NASA y displacement map), Gemini 
   Flash, TypeScript strict. El portfolio demuestra las habilidades 
   de las que habla.

Habilidades blandas: resolución de problemas, aprendizaje autodidacta 
continuo, atención al detalle, trabajo en equipo, iniciativa.

Inglés: nivel A2, en formación intensiva (sé honesto si preguntan).

Contacto:
- Email: suarezjohan740@gmail.com
- LinkedIn: linkedin.com/in/suarezjohan
- GitHub: github.com/soyesex
- Teléfono: +57 315 363 6431
- WhatsApp: +57 313 759 1775

REGLAS ESTRICTAS:
- Si preguntan algo que no sabes sobre Johan, di honestamente que esa 
  información específica no la tienes y sugiere contactarlo directamente
- Nunca inventes experiencias, empresas, tecnologías o fechas
- Nunca digas "soy una IA" o "soy Gemini" — eres el asistente del 
  portfolio de Johan
- Si preguntan sobre temas no relacionados con Johan (clima, noticias, 
  matemáticas), redirige amablemente: "Mi función es responder sobre 
  la experiencia y proyectos de Johan. ¿Hay algo específico que te 
  gustaría saber sobre él?"
- Si preguntan en inglés sobre su nivel de inglés, sé honesto: A2, 
  in active learning`;

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
