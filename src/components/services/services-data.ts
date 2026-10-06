/** Datos estáticos de la página de servicios. */

export type ServiceSize = "wide" | "tall" | "normal";

export interface ServiceData {
  title: string;
  desc: string;
  img: string;
  size: ServiceSize;
}

export const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop";

export const SERVICES_DATA: ServiceData[] = [
  { title: "Google", desc: "Si te olvidaste tu cuenta Google, te ayudamos.", img: "https://img2.elyerromenu.com/images/serviciotmc-dtd/eliminar-cuenta-google-frp-en-dispositivos-modernos/img.webp", size: "wide" },
  { title: "Mantenimiento", desc: "Tratamiento de placas y conectores tras contacto con líquidos.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop", size: "normal" },
  { title: "Reparación PC", desc: "Diagnóstico y reparación de hardware/software multimarcas.", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop", size: "tall" },
  { title: "Pin de Carga", desc: "Cambio de pin y placas de carga para Android y iOS.", img: "https://s.alicdn.com/@sc04/kf/Hfe9a62547f354e7cb713cdc84f6c2b9cR/251097027/Hfe9a62547f354e7cb713cdc84f6c2b9cR.jpg", size: "normal" },
  { title: "Baterías", desc: "Cambio de baterías para todos los modelos Android y iOS.", img: "https://s.alicdn.com/@sc02/kf/HTB1LzGmXPLuK1Rjy0Fhq6xpdFXa1/231480107/HTB1LzGmXPLuK1Rjy0Fhq6xpdFXa1.jpg", size: "normal" },
  { title: "Micro Soldadura", desc: "Cambios de FPC, IC de carga, condensadores y filtros.", img: "https://i0.wp.com/www.rapidmovil.es/wp-content/uploads/2020/12/motherboard_banner1-e1608386959676.jpg?fit=768%2C320&ssl=1", size: "wide" },
  { title: "Pantallas", desc: "Cambio de display calidad OLED, AMOLED y Original.", img: "/Display.jpg", size: "normal" },
  { title: "Reballing", desc: "Soldadura de componentes (CPU, memoria) en placa base.", img: "https://i.ytimg.com/vi/CTm72Ey09To/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGFUgXChlMA8=&rs=AOn4CLC6Y0D0Ja16DXr-3yCpLKdFTNreqA", size: "normal" },
];

export const PHILOSOPHY_ITEMS = [
  { title: "Diagnóstico Exacto", text: "Herramientas de última generación para encontrar el problema real." },
  { title: "Calidad Original", text: "Usamos pantallas OLED, AMOLED y componentes de la más alta fidelidad." },
  { title: "Garantía Total", text: "Tu tranquilidad es primero. Cada reparación está respaldada." }
];
