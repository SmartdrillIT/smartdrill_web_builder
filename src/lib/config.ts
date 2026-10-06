/**
 * Configuración central del sitio.
 * Los valores con `??` conservan el comportamiento actual cuando no hay env.
 */

export const WHATSAPP_QUOTES_NUMBER = "5930987980898";
export const WHATSAPP_DIRECT_NUMBER = "593987980898";
export const WHATSAPP_ALT_NUMBER = "593987991506";

export const CHAT_API_URL =
  process.env.NEXT_PUBLIC_CHAT_API_URL ?? "http://localhost:5001/api/chat";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * Dominio público del sitio (sin / final). Se usa para canonical,
 * Open Graph y sitemap. Cámbialo si tu dominio final es otro.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://smartdrill.net";

export const STORE_LOCATION = {
  lat: "-0.268841",
  lng: "-78.527817",
} as const;

export const MAPS_EMBED_SRC = `https://maps.google.com/maps?q=${STORE_LOCATION.lat},${STORE_LOCATION.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
export const MAPS_LINK = `https://maps.google.com/?q=${STORE_LOCATION.lat},${STORE_LOCATION.lng}`;
export const MAPS_DIRECTIONS_LINK = `https://www.google.com/maps/search/?api=1&query=${STORE_LOCATION.lat},${STORE_LOCATION.lng}`;
