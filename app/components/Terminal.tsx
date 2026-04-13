"use client";

import React, { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant" | "system";
  text: string;
};

export default function Terminal() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", text: "> initializing session..." },
    { role: "system", text: "> ready. ask about johan's experience" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() && !isLoading) {
      const userText = inputValue.trim();
      setInputValue("");
      setIsLoading(true);

      const newMessages: Message[] = [
        ...messages,
        { role: "user", text: "> " + userText },
        { role: "system", text: "> processing..." }
      ];
      setMessages(newMessages);

      try {
        const historyForGemini = messages
          .filter(m => m.role === "user" || m.role === "assistant")
          .map(m => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.role === "user" ? m.text.replace(/^> /, "") : m.text }]
          }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText, history: historyForGemini })
        });

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();

        setMessages(prev => {
          const removedProcessing = prev.filter(m => m.text !== "> processing...");
          return [...removedProcessing, { role: "assistant", text: data.reply }];
        });
      } catch (err) {
        setMessages(prev => {
          const removedProcessing = prev.filter(m => m.text !== "> processing...");
          return [...removedProcessing, { role: "system", text: "> connection error. retry." }];
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="absolute bottom-12 right-8 z-20 hidden md:flex w-[420px] h-[360px] backdrop-blur-xl bg-[rgba(0,0,0,0.85)] border border-white/[0.15] p-5 font-mono text-[13px] flex-col">
      {/* Header */}
      <div className="flex justify-between text-white/60 text-[10px] pb-2 mb-4 border-b border-white/15">
        <span>terminal</span>
        <span>v0.1.0</span>
      </div>

      {/* Log area */}
      <div className="flex-1 space-y-1 overflow-y-auto no-scrollbar" ref={messagesContainerRef}>
        {messages.map((msg, i) => (
          <p
            key={i}
            className={
              msg.role === "user"
                ? "text-[#D4C9A8]"
                : msg.role === "system"
                ? "text-white/60"
                : "text-white"
            }
          >
            {msg.text}
          </p>
        ))}
      </div>

      {/* Input row */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-white/40">{">"}</span>
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent border-none outline-none focus:ring-0 w-full text-white text-[13px] font-mono placeholder:text-white/50 disabled:opacity-50"
          placeholder={isLoading ? "wait..." : "ask about my work"}
          aria-label="Terminal input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <span
          className={`w-[6px] h-[14px] bg-[#3B82F6] shrink-0 ${
            isFocused && !isLoading ? "cursor-blink" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
