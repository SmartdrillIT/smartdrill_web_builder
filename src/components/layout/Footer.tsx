'use client';

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const content = t("footer");
  const nav = t("footerNav");

  return (
    <footer className="relative border-t border-zinc-200 bg-white transition-colors duration-500 font-sans antialiased">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 pb-8 md:pb-10">
          
          {/* Columna Branding - Logo y Texto Reforzados */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
            <div className="flex flex-row items-center gap-3">
              <Image
                src="/logosmartdrillV2.png"
                alt="Smart Drill"
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 object-contain transition-transform hover:scale-105"
              />
              <span className="text-2xl font-bold tracking-tighter text-zinc-900">
                Smart<span className="text-zinc-500">Drill</span>
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-zinc-600 max-w-sm font-light">
              {content.about}
            </p>
            
            <div className="flex gap-6 md:gap-5">
              {[
                { icon: <Instagram size="1.375rem" />, href: "#", label: "Instagram" },
                { icon: <Facebook size="1.375rem" />, href: "#", label: "Facebook" },
                { icon: <MessageCircle size="1.375rem" />, href: "https://wa.me/0987980898", label: "WhatsApp" },
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href}
                  aria-label={social.label} 
                  className="text-zinc-500 hover:text-zinc-900 transition-all duration-300 hover:-translate-y-1"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Columna Navegación - Adaptada a 2 columnas en móvil */}
          <div className="flex flex-col items-center lg:items-end lg:col-start-4 gap-5 text-center lg:text-right">
            <nav className="flex flex-col items-center lg:items-end gap-2 text-[0.8125rem] font-medium text-zinc-600">
              <Link href="/servicios" className="hover:text-zinc-900 transition-colors tracking-wide">{nav.servicios}</Link>
              <Link href="/marcas" className="hover:text-zinc-900 transition-colors tracking-wide">{nav.marcas}</Link>
              <Link href="#" className="hover:text-zinc-900 transition-colors tracking-wide">{nav.newsletter}</Link>
              <Link href="https://wa.me/0987980898" className="hover:text-zinc-900 transition-colors tracking-wide">{nav.contacto}</Link>
            </nav>
            
            <div>
              <p className="text-[0.75rem] text-zinc-600 tracking-tighter">
                {content.copyright.replace("{year}", String(currentYear))}
              </p>
            </div>
          </div>
        </div>

        {/* Barra inferior de créditos */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-6 md:flex-row">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[0.75rem] font-medium text-zinc-500 uppercase tracking-[0.2em]">
            <Link href="/privacidad" className="hover:text-zinc-900 transition-colors">{content.links.privacy}</Link>
            <Link href="/privacidad" className="hover:text-zinc-900 transition-colors">{content.links.terms}</Link>
          </div>
          
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-[0.75rem] font-medium text-zinc-500 uppercase tracking-tighter">Powered by</span>
            <span className="text-[0.75rem] font-bold text-zinc-900 tracking-widest">EQUAFORCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}