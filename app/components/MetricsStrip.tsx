const TECHS = [
  "TYPESCRIPT", "PYTHON", "PLAYWRIGHT", "SELENIUM",
  "DOCKER", "GIT", "NEXT.JS", "SUPABASE",
  "POSTGRESQL", "REST APIs", "CI/CD", "GEMINI AI",
];

export default function MetricsStrip() {
  return (
    <div className="w-full py-4 border-y border-white/[0.08] bg-black">
      <p className="px-12 font-mono text-[11px] tracking-[0.2em] text-white/40 whitespace-nowrap overflow-hidden text-ellipsis">
        {TECHS.join("  ·  ")}
      </p>
    </div>
  );
}
