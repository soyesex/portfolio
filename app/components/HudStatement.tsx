"use client";

import { useLang } from "../context/LanguageContext";

const copy = {
  es: { line1: "Romper software", line2: "es el trabajo." },
  en: { line1: "Breaking software", line2: "is the job." },
};

export default function HudStatement() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <div className="absolute bottom-12 left-8 z-10 max-w-2xl">
      <h1
        className="font-sans font-semibold text-white leading-[0.95] tracking-[-0.03em]"
        style={{ fontSize: "clamp(56px, 8vw, 96px)" }}
      >
        {t.line1}
        <br />
        {t.line2}
      </h1>
    </div>
  );
}
