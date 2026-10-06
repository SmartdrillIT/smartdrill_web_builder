import type { Metadata } from "next";

import BrandsSection from '@/components/brands/BrandsSection';

export const metadata: Metadata = {
  title: "Marcas que Reparamos: Apple, Samsung, Xiaomi y más",
  description:
    "SmartDrill repara celulares y computadoras de todas las marcas: iPhone, Samsung, Huawei, Xiaomi, Motorola y más, con repuestos de calidad.",
  alternates: { canonical: "/marcas" },
};

export default function Marcas() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-clip bg-white py-12 md:py-24 font-sans selection:bg-blue-100 selection:text-blue-900">
      <BrandsSection />
    </main>
  );
}
