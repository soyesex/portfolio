import SceneCanvas from "./SceneCanvas";
import HudTopLeft from "./HudTopLeft";
import HudTopRight from "./HudTopRight";
import HudStatement from "./HudStatement";
import Terminal from "./Terminal";

export default function Hero() {
  return (
    <section className="h-[100dvh] w-full relative overflow-hidden flex flex-col">
      {/* Three.js scene — fills background */}
      <SceneCanvas />

      {/* Top header: left info / right info
          Mobile: stacked (left above, right below)
          Desktop: side by side */}
      <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start pt-4 px-4 md:pt-8 md:px-8">
        <HudTopLeft />
        <HudTopRight />
      </div>

      {/* Push bottom content down */}
      <div className="flex-1" />

      {/* Bottom area: title + terminal
          Mobile: stacked (title above, terminal below)
          Desktop: side by side, aligned to bottom */}
      <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-8 px-4 md:pb-12 md:px-8">
        <HudStatement />
        <Terminal />
      </div>
    </section>
  );
}
