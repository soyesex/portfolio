import Hero from "./components/Hero";
import MetricsStrip from "./components/MetricsStrip";
import SelectedWork from "./components/SelectedWork";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Hero />
      <MetricsStrip />
      <SelectedWork />
      <Footer />
    </main>
  );
}
