import SceneCanvas from "./SceneCanvas";
import HudTopLeft from "./HudTopLeft";
import HudTopRight from "./HudTopRight";
import HudStatement from "./HudStatement";
import Terminal from "./Terminal";

export default function Hero() {
  return (
    <section className="h-screen w-full relative overflow-hidden">
      {/* Three.js scene layer */}
      <SceneCanvas />

      {/* HUD overlay layer */}
      <HudTopLeft />
      <HudTopRight />
      <HudStatement />
      <Terminal />
    </section>
  );
}
