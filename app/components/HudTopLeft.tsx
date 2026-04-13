"use client";

import { useLang } from "../context/LanguageContext";

export default function HudTopLeft() {
  const { lang, toggle } = useLang();

  return (
    <div className="absolute top-8 left-8 z-10 font-mono text-[11px] uppercase leading-loose text-white/60">
      <p>Johan Suarez / SDET &amp; Full Stack Dev</p>
      <p>Bogotá, Colombia</p>
      <button
        onClick={toggle}
        aria-label="Toggle language / Cambiar idioma"
        className="mt-0.5 text-white/25 hover:text-white/60 transition-colors duration-200 tracking-[0.18em] cursor-pointer"
      >
        {lang === "es" ? "[ ES · en ]" : "[ es · EN ]"}
      </button>
    </div>
  );
}
