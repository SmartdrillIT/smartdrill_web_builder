import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";

// Secciones bajo el pliegue: cada una viaja en su propio chunk y no
// bloquea el primer pintado (misma UI, carga diferida).
const PhoneShowcase = dynamic(
  () => import("@/components/home/PhoneShowcase")
);
const ServicesGrid = dynamic(() => import("@/components/home/ServicesGrid"));
const LocationSection = dynamic(
  () => import("@/components/home/LocationSection")
);

export default function Home() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-clip bg-[#dce0e6] text-zinc-900 selection:bg-orange-500/30 transition-colors duration-500">
      <h1 className="sr-only">Smart Drill — Servicio técnico de celulares y computadoras</h1>
      <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <HeroSection />
      <div className="relative z-40 pb-20">
        <PhoneShowcase />
      </div>
      <ServicesGrid />
      <div className="h-16" />
      <LocationSection />
    </div>
  );
}
