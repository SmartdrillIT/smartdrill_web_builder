import type { Metadata } from "next";

import ContactSection from '@/components/contact/ContactSection';

export const metadata: Metadata = {
  title: "Contacto y Ubicación en Quito",
  description:
    "Contáctanos por WhatsApp, llamada o correo. SmartDrill: S15-190 Pedro Vicente Maldonado, Quito. Lun–Vie 09–18, Sáb 10–14.",
  alternates: { canonical: "/contacto" },
};

export default function Contacto() {
  return (
    <ContactSection />
  );
}
