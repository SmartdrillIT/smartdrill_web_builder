import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  // Página aún sin contenido: no indexar hasta redactarla.
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <div>
      {/* <h1>Política de Privacidad</h1>
      <p>Contenido de la página...</p> */}
    </div>
  );
}