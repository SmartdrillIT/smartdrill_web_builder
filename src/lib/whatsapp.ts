/** Utilidades de WhatsApp: construir links y avisar a la Isla Dinámica. */
import { WHATSAPP_QUOTES_NUMBER } from "./config";

export function buildWhatsAppLink(phone: string, message?: string): string {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function openWhatsApp(
  message: string,
  phone: string = WHATSAPP_QUOTES_NUMBER
): void {
  window.open(buildWhatsAppLink(phone, message), "_blank");
}

export interface QuoteSentDetail {
  title: string;
  message: string;
}

/** Avisa al Navbar (Isla Dinámica) que se envió una cotización. */
export function notifyQuoteSent(detail: QuoteSentDetail): void {
  window.dispatchEvent(new CustomEvent<QuoteSentDetail>("whatsappQuoteSent", { detail }));
}

/** Arma el mensaje de cotización a partir del template del diccionario. */
export function buildQuoteMessage(
  template: string,
  modelLabel: string,
  issues: string[]
): string {
  const issuesText =
    issues.length > 0 ? issues.map((issue) => `- ${issue}`).join("\n") : "";
  return template
    .replace("{model}", modelLabel)
    .replace("{issues}", issuesText || "- Revisión técnica general");
}
