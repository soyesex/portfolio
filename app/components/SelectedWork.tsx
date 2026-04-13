"use client";

import { useLang, type Lang } from "../context/LanguageContext";

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
      es: "Plataforma fitness premium con IA generativa. Planes de entrenamiento adaptativos, RAG sobre biblioteca de ejercicios y sistema de gamificación para retención de usuarios.",
      en: "Premium fitness platform with generative AI. Adaptive training plans, RAG over an exercise library, and a gamification system for user retention.",
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
}> = {
  es: {
    label: "002\u00a0/\u00a0Proyectos",
    heading1: "Tres proyectos.",
    heading2: "Tres problemas resueltos.",
    viewProject: "Ver proyecto →",
    ariaLabel: (t) => `Ver proyecto ${t}`,
  },
  en: {
    label: "002\u00a0/\u00a0Selected Work",
    heading1: "Three projects.",
    heading2: "Three problems solved.",
    viewProject: "View project →",
    ariaLabel: (t) => `View project ${t}`,
  },
};

export default function SelectedWork() {
  const { lang } = useLang();
  const s = sectionCopy[lang];

  return (
    <section className="w-full bg-black pt-32 pb-24">
      <div className="max-w-[900px] mx-auto px-6 md:px-10">

        {/* ── Section header ── */}
        <header className="mb-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/30 mb-8">
            {s.label}
          </p>
          <h2
            className="text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white"
            style={{ fontFamily: "var(--font-space-grotesk, var(--font-sans))" }}
          >
            {s.heading1}
            <br />
            {s.heading2}
          </h2>
        </header>

        {/* ── Cards ── */}
        <div className="flex flex-col gap-px">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.href}
              className="project-card group block relative overflow-hidden border-l-[5px] border border-white/[0.07] px-8 md:px-10 py-10 outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              style={
                {
                  borderLeftColor: project.accent,
                  backgroundColor: "rgba(255,255,255,0.025)",
                  "--neon-rgb": project.accentRgb,
                } as React.CSSProperties
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.ariaLabel(project.title)}
            >
              {/* Background radial glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 80% at 0% 50%, rgba(${project.accentRgb}, 0.07) 0%, transparent 100%)`,
                }}
                aria-hidden="true"
              />

              {/* Project number */}
              <span
                className="absolute top-8 right-8 font-mono text-[11px] tracking-[0.2em] text-white/20 select-none"
                aria-hidden="true"
              >
                {project.number}
              </span>

              {/* Category */}
              <p
                className="font-mono text-[10px] uppercase tracking-[0.25em] mb-5 transition-colors duration-300"
                style={{ color: `rgba(${project.accentRgb}, 0.7)` }}
              >
                {project.category[lang]}
              </p>

              {/* Title */}
              <h3
                className="text-[clamp(2.5rem,7vw,4rem)] font-semibold leading-none tracking-[-0.03em] text-white mb-6"
                style={{ fontFamily: "var(--font-space-grotesk, var(--font-sans))" }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[16px] leading-[1.7] text-white/50 max-w-[520px] mb-8">
                {project.description[lang]}
              </p>

              {/* Stack */}
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/25">
                {project.stack.join("\u2002·\u2002")}
              </p>

              {/* Hover arrow */}
              <span
                className="absolute right-8 bottom-10 text-white/20 text-base opacity-0 translate-y-[4px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 select-none"
                aria-hidden="true"
              >
                {s.viewProject}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
