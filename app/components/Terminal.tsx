"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLang, type Lang } from "../context/LanguageContext";

// ── Translations ─────────────────────────────────────────────────
const copy: Record<Lang, {
  ready: string;
  placeholder: string;
  wait: string;
  processing: string;
  error: string;
  tip: string;
}> = {
  es: {
    ready:
      "> sistema listo. pregúntame directamente sobre las dudas que tengas sobre johan.",
    placeholder: "pregunta sobre mi trabajo",
    wait: "espera...",
    processing: "> procesando...",
    error: "> error de conexión. intenta de nuevo.",
    tip: "(ej. intenta escribir: ¿qué tecnologías usas?)",
  },
  en: {
    ready:
      "> system ready. ask me directly about any questions you have about johan.",
    placeholder: "ask about my work",
    wait: "wait...",
    processing: "> processing...",
    error: "> connection error. retry.",
    tip: "(e.g. try typing: what technologies do you use?)",
  },
};

// ── Types ────────────────────────────────────────────────────────
type Role = "user" | "assistant" | "system";

interface Message {
  id?: string;
  role: Role;
  text: string;
}

const INIT_MESSAGE: Message = { role: "system", text: "> initializing session..." };

// ── Component ────────────────────────────────────────────────────
export default function Terminal() {
  const { lang } = useLang();
  const t = copy[lang];

  const [messages, setMessages] = useState<Message[]>([
    INIT_MESSAGE,
    { role: "system", text: copy["en"].ready },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [tip, setTip] = useState<string | null>(null);

  // Ref to scroll the messages container — NOT scrollIntoView (that moves the page)
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const tipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasInteractedRef = useRef(false);
  const langRef = useRef<Lang>(lang);

  useEffect(() => { langRef.current = lang; }, [lang]);

  // Update ready message on lang change — only before user interaction
  useEffect(() => {
    if (!hasInteractedRef.current) {
      setMessages([INIT_MESSAGE, { role: "system", text: copy[lang].ready }]);
    }
  }, [lang]);

  // Auto-tip after 5 s (fires once on mount)
  useEffect(() => {
    tipTimerRef.current = setTimeout(() => {
      if (!hasInteractedRef.current) {
        setTip(copy[langRef.current].tip);
      }
    }, 5000);
    return () => { if (tipTimerRef.current) clearTimeout(tipTimerRef.current); };
  }, []);

  // Scroll messages container internally — never touches the page scroll
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, tip]);

  // ── Handlers ─────────────────────────────────────────────────
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    if (e.target.value.length > 0 && tip) setTip(null);
  }

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter" || !inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue("");
    setIsLoading(true);
    setTip(null);
    hasInteractedRef.current = true;
    if (tipTimerRef.current) clearTimeout(tipTimerRef.current);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: "> " + userText },
      { id: "processing", role: "system", text: copy[langRef.current].processing },
    ]);

    try {
      const history = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.role === "user" ? m.text.replace(/^> /, "") : m.text }],
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "processing"),
        { role: "assistant", text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "processing"),
        { role: "system", text: copy[langRef.current].error },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="flex w-full md:w-[420px] h-[220px] md:h-[360px] backdrop-blur-xl bg-[rgba(0,0,0,0.85)] border border-white/[0.15] p-4 md:p-5 font-mono text-[12px] md:text-[13px] flex-col shrink-0">

      {/* Header */}
      <div className="flex justify-between text-white/60 text-[10px] pb-2 mb-4 border-b border-white/15">
        <span>terminal</span>
        <span>v0.1.0</span>
      </div>

      {/* Log area — scroll is contained here, never affects page */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto no-scrollbar space-y-1"
      >
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

        {tip && (
          <p className="tip-blink text-white/35 italic mt-2">{tip}</p>
        )}
      </div>

      {/* Input row */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-white/40">{">"}</span>
        <input
          type="text"
          className="bg-transparent border-none outline-none focus:ring-0 w-full text-white text-[13px] font-mono placeholder:text-white/50 disabled:opacity-50"
          placeholder={isLoading ? t.wait : t.placeholder}
          aria-label="Terminal input"
          value={inputValue}
          onChange={handleChange}
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
