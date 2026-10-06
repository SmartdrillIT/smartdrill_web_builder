import { Geist, Geist_Mono, Syncopate, Space_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import "./globals.css";
// Blobatar: motion.css + gaze.css se importan una sola vez aquí (docs oficiales).
import "blobatar/motion.css";
import "blobatar/gaze.css";

import { Providers } from "@/components/layout/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_URL, STORE_LOCATION } from "@/lib/config";

// El chat no es crítico para el primer pintado: se carga en un chunk aparte.
const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displayFont = Syncopate({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const techFont = Space_Mono({
  variable: "--font-tech",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SmartDrill | Servicio Técnico de Celulares y Computadoras",
    template: "%s | SmartDrill",
  },
  description:
    "SmartDrill: reparación de hardware y software de celulares, tablets y computadoras en Quito. Pantallas, baterías, pines de carga y micro soldadura con garantía.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "SmartDrill | Servicio Técnico de Celulares y Computadoras",
    description:
      "Reparación de hardware y software de celulares, tablets y computadoras. Pantallas, baterías, pines de carga y micro soldadura con garantía.",
    type: "website",
    locale: "es_EC",
    url: "/",
    siteName: "SmartDrill",
    images: [
      {
        url: "/logosmartdrillV2.png",
        width: 1243,
        height: 1462,
        alt: "SmartDrill — Servicio Técnico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartDrill | Servicio Técnico de Celulares y Computadoras",
    description:
      "Reparación de hardware y software de celulares, tablets y computadoras con garantía.",
    images: ["/logosmartdrillV2.png"],
  },
  // Se activa sola cuando definas NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION en tu hosting.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

// Datos estructurados para que Google muestre a SmartDrill como negocio local.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ElectronicsStore",
  name: "SmartDrill",
  description:
    "Servicio técnico de celulares, tablets y computadoras en Quito: pantallas, baterías, pines de carga y micro soldadura con garantía.",
  url: SITE_URL,
  image: `${SITE_URL}/logosmartdrillV2.png`,
  telephone: "+593987980898",
  email: "soporte@smartdrill.net",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "S15-190 Pedro Vicente Maldonado",
    addressLocality: "Quito",
    postalCode: "170601",
    addressCountry: "EC",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: Number(STORE_LOCATION.lat),
    longitude: Number(STORE_LOCATION.lng),
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="light">
      <body className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} ${techFont.variable} antialiased bg-white text-zinc-900 min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="block w-full max-w-full overflow-x-clip">
            {children}
          </main>
          <Footer />
          <ChatWidget />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
          />
        </Providers>
      </body>
    </html>
  );
}
