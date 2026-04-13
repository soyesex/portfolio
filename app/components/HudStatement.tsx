export default function HudStatement() {
  return (
    <div className="absolute bottom-12 left-8 z-10 max-w-2xl">
      <h1
        className="font-sans font-semibold text-white leading-[0.95] tracking-[-0.03em]"
        style={{ fontSize: "clamp(56px, 8vw, 96px)" }}
      >
        Breaking software
        <br />
        is the job.
      </h1>
    </div>
  );
}
