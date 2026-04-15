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
    <div className="max-w-[280px] sm:max-w-md md:max-w-2xl">
      <h1
        className="font-sans font-semibold text-white leading-[0.95] tracking-[-0.03em] text-5xl md:text-7xl lg:text-9xl"
      >
        {t.line1}
        <br />
        {t.line2}
      </h1>
    </div>
  );
}
