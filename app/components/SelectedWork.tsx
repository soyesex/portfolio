"use client";

import { useState } from "react";
import { useLang, type Lang } from "../context/LanguageContext";
import ComingSoonModal from "./ComingSoonModal";

interface BilingualProject {
  id: string;
  number: string;
  title: string;
  category: Record<Lang, string>;
  description: Record<Lang, string>;
  stack: string[];
  accent: string;
  accentRgb: string;
  href: string;
  comingSoon?: boolean;
}

const projects: BilingualProject[] = [
  {
    id: "gym-ai",
    number: "01",
    title: "GYM-AI",
    category: {
      es: "IA · Full-stack · Producción",
      en: "AI · Full-stack · Production",
    },
    description: {
      es: "Plataforma fitness full-stack con IA generativa. Planes de entrenamiento adaptativos, RAG sobre biblioteca de ejercicios y sistema de gamificación para retención de usuarios.",
      en: "Full-stack fitness platform with generative AI. Adaptive training plans, RAG over an exercise library, and a gamification system for user retention.",
    },
    stack: ["Next.js 15", "Supabase", "Gemini", "TypeScript"],
    accent: "#39FF14",
    accentRgb: "57, 255, 20",
    href: "https://gym-ai-gilt.vercel.app",
  },
  {
    id: "playwright-qa",
    number: "02",
    title: "Playwright QA Suite",
    category: {
      es: "QA Engineering · Automatización · CI/CD",
      en: "QA Engineering · Automation · CI/CD",
    },
    description: {
      es: "Suite de tests E2E con arquitectura independiente sobre Supabase. Page Objects, fixtures reutilizables, cobertura de flujos críticos y pipeline CI/CD listo para producción.",
      en: "E2E test suite with an independent architecture built on Supabase. Page Objects, reusable fixtures, critical flow coverage, and a CI/CD-ready pipeline.",
    },
    stack: ["Playwright", "TypeScript", "Supabase"],
    accent: "#3B82F6",
    accentRgb: "59, 130, 246",
    href: "https://github.com/soyesex/gym-ai-e2e-suite",
  },
  {
    id: "deluxe-cars",
    number: "03",
    title: "Deluxe Cars",
    category: {
      es: "Systems Design · Desktop · SQL",
      en: "Systems Design · Desktop · SQL",
    },
    description: {
      es: "Sistema monolítico de gestión para tienda de autopartes. Módulos de inventario, facturación y reportes en aplicación desktop nativa de alto rendimiento.",
      en: "Monolithic management system for an auto parts store. Inventory, invoicing, and reporting modules in a high-performance native desktop application.",
    },
    stack: ["C#", "WPF", "SQL Server"],
    accent: "#FF2D55",
    accentRgb: "255, 45, 85",
    href: "https://github.com/soyesex/DeluxeCars-Sistema",
  },
];

const sectionCopy: Record<Lang, {
  label: string;
  heading1: string;
  heading2: string;
  viewProject: string;
  ariaLabel: (title: string) => string;
  comingSoonBadge: string;
}> = {
  es: {
    label: "002\u00a0/\u00a0Proyectos",
    heading1: "Tres proyectos.",
    heading2: "Tres problemas resueltos.",
    viewProject: "Ver proyecto →",
    ariaLabel: (t) => `Ver proyecto ${t}`,
    comingSoonBadge: "PRÓXIMAMENTE",
  },
  en: {
    label: "002\u00a0/\u00a0Selected Work",
    heading1: "Three projects.",
    heading2: "Three problems solved.",
    viewProject: "View project →",
    ariaLabel: (t) => `View project ${t}`,
    comingSoonBadge: "COMING SOON",
  },
};

export default function SelectedWork() {
  const { lang } = useLang();
  const s = sectionCopy[lang];
  const [modalOpen, setModalOpen] = useState(false);

  function openModal(e: React.MouseEvent) {
    e.preventDefault();
    setModalOpen(true);
  }

  return (
    <>
      <ComingSoonModal open={modalOpen} lang={lang} onClose={() => setModalOpen(false)} />

      <section className="w-full bg-black pt-20 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-[900px] mx-auto px-4 md:px-10">

          {/* ── Section header ── */}
          <header className="mb-12 md:mb-20">
            <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/30 mb-6 md:mb-8">
              {s.label}
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-[-0.03em] text-white"
              style={{ fontFamily: "var(--font-space-grotesk, var(--font-sans))" }}
            >
              {s.heading1}
              <br />
              {s.heading2}
            </h2>
          </header>

          {/* ── Cards ── */}
          <div className="flex flex-col gap-px">
            {projects.map((project) => {
              const isComingSoon = !!project.comingSoon;

              return (
                <a
                  key={project.id}
                  href={project.href}
                  className="project-card group block relative overflow-hidden border-l-[3px] md:border-l-[5px] border border-white/[0.07] px-5 md:px-10 py-8 md:py-10 outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                  style={
                    {
                      borderLeftColor: project.accent,
                      backgroundColor: "rgba(255,255,255,0.025)",
                      "--neon-rgb": project.accentRgb,
                    } as React.CSSProperties
                  }
                  target={isComingSoon ? undefined : "_blank"}
                  rel={isComingSoon ? undefined : "noopener noreferrer"}
                  aria-label={
                    isComingSoon
                      ? `${project.title} — ${s.comingSoonBadge}`
                      : s.ariaLabel(project.title)
                  }
                  onClick={isComingSoon ? openModal : undefined}
                >
                  {/* Background radial glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 60% 80% at 0% 50%, rgba(${project.accentRgb}, 0.07) 0%, transparent 100%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Project number — smaller on mobile */}
                  <span
                    className="absolute top-5 right-5 md:top-8 md:right-8 font-mono text-[9px] md:text-[11px] tracking-[0.2em] text-white/20 select-none"
                    aria-hidden="true"
                  >
                    {project.number}
                  </span>

                  {/* Coming soon badge */}
                  {isComingSoon && (
                    <button
                      type="button"
                      onClick={openModal}
                      className="absolute top-5 left-5 md:top-8 md:left-10 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.2em] px-2 py-1 border border-[#39ff14]/40 text-[#39ff14]/70 hover:border-[#39ff14]/80 hover:text-[#39ff14] transition-colors duration-200 cursor-pointer select-none"
                      aria-label={lang === "es" ? "Proyecto en construcción" : "Project under construction"}
                    >
                      {s.comingSoonBadge}
                    </button>
                  )}

                  {/* Category — with top padding if badge present */}
                  <p
                    className={`font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] mb-4 md:mb-5 transition-colors duration-300 flex-wrap leading-relaxed ${isComingSoon ? "mt-8 md:mt-10" : ""}`}
                    style={{ color: `rgba(${project.accentRgb}, 0.7)` }}
                  >
                    {project.category[lang]}
                  </p>

                  {/* Title */}
                  <h3
                    className="text-[clamp(1.75rem,7vw,4rem)] font-semibold leading-none tracking-[-0.03em] text-white mb-4 md:mb-6"
                    style={{ fontFamily: "var(--font-space-grotesk, var(--font-sans))" }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[14px] md:text-[16px] leading-[1.7] text-white/50 max-w-full md:max-w-[520px] mb-6 md:mb-8">
                    {project.description[lang]}
                  </p>

                  {/* Stack — wraps naturally, smaller on mobile */}
                  <p className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] text-white/25 leading-relaxed">
                    {project.stack.join("\u2002·\u2002")}
                  </p>

                  {/* Hover arrow */}
                  <span
                    className="absolute right-5 md:right-8 bottom-8 md:bottom-10 text-white/20 text-sm opacity-0 translate-y-[4px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 select-none"
                    aria-hidden="true"
                  >
                    {s.viewProject}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
