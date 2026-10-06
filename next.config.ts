import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Menos bytes en la respuesta HTML.
  compress: true,
  poweredByHeader: false,

  images: {
    // Sirve AVIF/WebP automáticamente (requiere `sharp`, ya instalado).
    formats: ["image/avif", "image/webp"],
    // Dominios externos usados por la sección de Servicios.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "s.alicdn.com" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img2.elyerromenu.com" },
    ],
  },
};

export default nextConfig;
