import type { Metadata } from "next";

import ServicesSection from '@/components/services/ServicesSection';

export const metadata: Metadata = {
  title: "Reparación de Celulares y Computadoras",
  description:
    "SmartDrill Quito: cambio de pantallas, baterías, pin de carga, micro soldadura y reballing para todas las marcas, con garantía.",
  alternates: { canonical: "/servicios" },
};

export default function Servicios() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-clip bg-[#dce0e6]">
      <ServicesSection />
    </main>
  );
}
