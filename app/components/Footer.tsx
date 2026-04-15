"use client";

import { useLang, type Lang } from "../context/LanguageContext";

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const footerCopy: Record<Lang, {
  label: string;
  heading: string;
  tagline: string;
}> = {
  es: {
    label: "003\u00a0/\u00a0Contacto",
    heading: "Conectemos.",
    tagline: "QA Engineer · Testing con IA · Bogotá, CO",
  },
  en: {
    label: "003\u00a0/\u00a0Contact",
    heading: "Let\u2019s connect.",
    tagline: "QA Engineer · AI-driven testing · Bogotá, CO",
  },
};

const contacts = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/suarezjohan",
    Icon: IconLinkedIn,
  },
  {
    id: "email",
    label: "suarezjohan740@gmail.com",
    href: "mailto:suarezjohan740@gmail.com",
    Icon: IconMail,
  },
];

export default function Footer() {
  const { lang } = useLang();
  const f = footerCopy[lang];

  return (
    <footer className="w-full bg-black border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-10 py-24">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/30 mb-6">
            {f.label}
          </p>
          <h2
            className="text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none tracking-[-0.03em] text-white"
            style={{ fontFamily: "var(--font-space-grotesk, var(--font-sans))" }}
          >
            {f.heading}
          </h2>
        </div>

        {/* Contact links */}
        <div className="flex flex-col md:flex-row gap-4 mb-20 md:mb-24">
          {contacts.map(({ id, label, href, Icon }) => (
            <a
              key={id}
              href={href}
              target={id === "linkedin" ? "_blank" : undefined}
              rel={id === "linkedin" ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 border border-white/[0.08] bg-white/[0.02] px-6 py-5 text-white/50 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
            >
              <span className="text-white/30 group-hover:text-white/70 transition-colors duration-300">
                <Icon />
              </span>
              <span className="font-mono text-[13px] tracking-wide">{label}</span>
              <span className="ml-auto text-white/20 group-hover:text-white/50 group-hover:translate-x-[3px] transition-all duration-300 text-sm select-none" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4 pt-8 border-t border-white/[0.06]">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/20"
            style={{ fontFamily: "var(--font-space-grotesk, var(--font-sans))" }}
          >
            Johan Suarez
          </span>
          <span className="font-mono text-[11px] text-white/15">
            {f.tagline}
          </span>
        </div>

      </div>
    </footer>
  );
}
