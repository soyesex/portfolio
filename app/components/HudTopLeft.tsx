export default function HudTopLeft() {
  return (
    <div className="absolute top-8 left-8 z-10 font-mono text-[11px] uppercase leading-loose text-white/60">
      <p>johan / qa engineer · ai-driven testing</p>
      <p className="flex items-center gap-1.5">
        bogotá, co — status: available
        <span
          className="inline-block w-1.5 h-1.5 bg-[#3B82F6] pulse-dot"
          aria-label="Available status indicator"
        />
      </p>
    </div>
  );
}
