"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Lang } from "../context/LanguageContext";

const copy: Record<Lang, { status: string; title: string; message: string; close: string }> = {
  es: {
    status: "estado: en desarrollo",
    title: "En construcción",
    message:
      "Esta suite de automatización E2E está siendo desarrollada actualmente con Playwright, TypeScript y Supabase. Estará disponible muy pronto.",
    close: "Cerrar",
  },
  en: {
    status: "status: in progress",
    title: "Under construction",
    message:
      "This E2E automation suite is currently being developed with Playwright, TypeScript, and Supabase. Coming very soon.",
    close: "Close",
  },
};

interface ComingSoonModalProps {
  open: boolean;
  lang: Lang;
  onClose: () => void;
}

export default function ComingSoonModal({ open, lang, onClose }: ComingSoonModalProps) {
  const t = copy[lang];
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Save focus on open, restore on close
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      const id = setTimeout(() => closeRef.current?.focus(), 40);
      return () => clearTimeout(id);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open, onClose]);

  // Focus trap
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab") return;
    const focusable = Array.from(
      e.currentTarget.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            aria-hidden="true"
          />

          {/* Dialog wrapper — clicking outside the panel closes the modal */}
          <motion.div
            key="dialog"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onKeyDown={handleKeyDown}
            onClick={onClose}
          >
            <div
              role="dialog"
              // Stop clicks on the panel from bubbling up to the wrapper
              onClick={(e) => e.stopPropagation()}
              aria-modal="true"
              aria-labelledby="csm-title"
              aria-describedby="csm-desc"
              className="relative w-full max-w-md bg-black border border-[#39ff14]/50 p-7 md:p-8"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(57,255,20,0.08), 0 0 48px rgba(57,255,20,0.10), 0 0 120px rgba(57,255,20,0.04)",
              }}
            >
              {/* Corner accent lines */}
              <span className="absolute top-0 left-0 w-8 h-px bg-[#39ff14]" aria-hidden="true" />
              <span className="absolute top-0 left-0 h-8 w-px bg-[#39ff14]" aria-hidden="true" />
              <span className="absolute bottom-0 right-0 w-8 h-px bg-[#39ff14]/40" aria-hidden="true" />
              <span className="absolute bottom-0 right-0 h-8 w-px bg-[#39ff14]/40" aria-hidden="true" />

              {/* Header row */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#39ff14]/50 mb-2">
                    {t.status}
                  </p>
                  <h2
                    id="csm-title"
                    className="text-xl md:text-2xl font-semibold text-white tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-space-grotesk, var(--font-sans))" }}
                  >
                    {t.title}
                  </h2>
                </div>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  className="ml-6 shrink-0 mt-0.5 font-mono text-[11px] text-white/30 hover:text-white/70 transition-colors duration-200 cursor-pointer"
                  aria-label={lang === "es" ? "Cerrar modal" : "Close modal"}
                >
                  [ESC]
                </button>
              </div>

              {/* Message */}
              <p id="csm-desc" className="text-[14px] md:text-[15px] leading-[1.75] text-white/55">
                {t.message}
              </p>

              {/* Footer */}
              <div className="mt-7 pt-5 border-t border-white/[0.07] flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                  02&nbsp;/&nbsp;Playwright QA Suite
                </span>
                <button
                  onClick={onClose}
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#39ff14]/60 hover:text-[#39ff14] transition-colors duration-200 cursor-pointer"
                >
                  {t.close}&nbsp;→
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
