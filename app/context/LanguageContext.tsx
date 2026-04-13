"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type Lang = "es" | "en";

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default "en" → safe for SSR, avoids hydration mismatch
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    // Detect browser language only on the client
    const detected = navigator.language.toLowerCase();
    setLang(detected.startsWith("es") ? "es" : "en");
  }, []);

  function toggle() {
    setLang((prev) => (prev === "en" ? "es" : "en"));
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextType {
  return useContext(LanguageContext);
}
