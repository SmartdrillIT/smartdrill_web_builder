'use client';

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Smartphone, Wrench, ArrowRight, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import DynamicIsland from "./DynamicIsland";
import gsap from "gsap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();

  const headerRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const [rotation, setRotation] = useState(0);
  const touchStart = useRef({ x: 0, y: 0 });
  const currentRotation = useRef(0);
  const isDragging = useRef(false);
  const activeIndexRef = useRef<number>(0);

  const [hasInteracted, setHasInteracted] = useState(false);

  const content = t("navbar");
  const navMobile = t("navMobile");
  const servicesName = content?.links?.services || "Servicios";
  const brandsName = content?.links?.brands || "Marcas";
  const contactName = content?.links?.contact || "Contáctanos";
  const homeName = navMobile?.home || "INICIO";
  const swipeHint = navMobile?.swipe || "Desliza";

  const DESKTOP_ITEMS = [
    { name: servicesName, href: "/servicios", icon: Wrench },
    { name: brandsName, href: "/marcas", icon: Smartphone },
  ];

  const MOBILE_ITEMS = useMemo(
    () => [
      { name: homeName, href: "/" },
      { name: servicesName.toUpperCase(), href: "/servicios" },
      { name: brandsName.toUpperCase(), href: "/marcas" },
      { name: contactName.toUpperCase(), href: "/contacto" },
      { name: language === "es" ? "ENGLISH" : "ESPAÑOL", isAction: true },
    ],
    [homeName, servicesName, brandsName, contactName, language]
  );

  const ANGLE_STEP = 22;

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power4.out" }
    );

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ... (Resto de la lógica de rotación móvil igual) ...
  useEffect(() => {
    const currentIndex = MOBILE_ITEMS.findIndex(item => item.href === pathname);
    if (currentIndex !== -1) {
      const targetRotation = (currentIndex - 2) * -ANGLE_STEP;
      // Sincroniza el carrusel con la ruta (gsap es sistema externo).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRotation(targetRotation);
      activeIndexRef.current = currentIndex;
      gsap.set(circleRef.current, { rotation: targetRotation });
    }
  }, [pathname, MOBILE_ITEMS]);

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasInteracted) setHasInteracted(true);
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    currentRotation.current = rotation;
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaX = e.touches[0].clientX - touchStart.current.x;
    if (Math.abs(deltaX) > 5) isDragging.current = true;
    const newRot = currentRotation.current + (deltaX * 0.15);
    setRotation(newRot);
    gsap.set(circleRef.current, { rotation: newRot });
  };

  const activateMobileItem = (index: number) => {
    const clamped = Math.max(0, Math.min(MOBILE_ITEMS.length - 1, index));
    const targetRotation = (clamped - 2) * -ANGLE_STEP;
    setHasInteracted(true);
    setRotation(targetRotation);
    activeIndexRef.current = clamped;
    gsap.to(circleRef.current, {
      rotation: targetRotation,
      duration: 0.4,
      ease: "back.out(1.1)",
    });
    const selectedItem = MOBILE_ITEMS[clamped];
    if (selectedItem?.isAction) toggleLanguage();
    else if (selectedItem?.href) router.push(selectedItem.href);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    const nearest = Math.round(rotation / ANGLE_STEP) * ANGLE_STEP;
    const newActiveIndex = Math.round((nearest * -1) / ANGLE_STEP) + 2;
    setRotation(nearest);
    gsap.to(circleRef.current, {
      rotation: nearest,
      duration: 0.4,
      ease: "back.out(1.1)",
      onComplete: () => {
        if (activeIndexRef.current !== newActiveIndex) {
          activeIndexRef.current = newActiveIndex;
          const selectedItem = MOBILE_ITEMS[newActiveIndex];
          if (selectedItem?.isAction) toggleLanguage();
          else if (selectedItem?.href) router.push(selectedItem.href);
        }
        isDragging.current = false;
      }
    });
  };

  const handleCarouselKeyDown = (e: React.KeyboardEvent) => {
    const current = Math.round((rotation * -1) / ANGLE_STEP) + 2;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      activateMobileItem(current - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      activateMobileItem(current + 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      activateMobileItem(0);
    } else if (e.key === "End") {
      e.preventDefault();
      activateMobileItem(MOBILE_ITEMS.length - 1);
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activateMobileItem(index);
    }
  };

  return (
    <header ref={headerRef} className="fixed top-0 z-[100] w-full flex justify-center pt-2 md:pt-3 px-4 pointer-events-none opacity-0">
      
      {/* ISLA DINÁMICA: Estilo Premium (Negro + Verde) */}
      <DynamicIsland />

      {/* DESKTOP NAVBAR: cambia h-14 por h-16 */}
      <div
        className={`hidden md:flex pointer-events-auto items-center justify-between w-[95%] max-w-6xl h-16 transition-all duration-500 rounded-full pl-3 pr-4 border relative z-[100] shadow-[0_8px_30px_rgba(0,0,0,0.08)] ${
          scrolled ? "bg-white/95 backdrop-blur-2xl border-zinc-200 scale-[0.98]" : "bg-white border-zinc-200/70"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 group shrink-0 min-w-0">
          {/* Insignia oscura: el logo en blanco resalta mucho más */}
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 shadow-md">
            <span className="relative block h-8 w-8">
              <Image
                src="/logosmartdrillV2.png"
                alt="Logo SmartDrill"
                fill
                sizes="32px"
                priority
                className="object-contain brightness-0 invert"
              />
            </span>
          </span>
          <span className="text-xl font-extrabold tracking-tight text-zinc-900 truncate">
            Smart<span className="text-zinc-500">Drill</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1.5">
          {DESKTOP_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[0.875rem] font-medium rounded-full transition-all ${
                pathname === item.href
                  ? "bg-zinc-900 text-white shadow-md"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              <item.icon size={14} /> {item.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-zinc-200 mx-2" />
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={language === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
            className="lang-btn px-2 py-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5"
          >
            <Globe size={14} />
            {language.toUpperCase()}
          </button>
          <Link
            href="/contacto"
            className="ml-2 flex items-center gap-1.5 bg-zinc-900 px-4 py-2 text-[0.875rem] font-bold text-white rounded-full hover:bg-zinc-800 active:scale-95 transition-all shadow-lg shadow-zinc-900/10"
          >
            <span>{contactName}</span>
            <ArrowRight size={14} />
          </Link>
        </nav>
      </div>

      {/* MÓVIL NAVBAR */}
      <div
        className="md:hidden fixed top-0 left-0 w-full max-w-full h-[6.25rem] z-[120] pointer-events-none overflow-hidden touch-none"
        role="navigation"
        aria-label={language === "es" ? "Menú principal" : "Main menu"}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/60 to-transparent z-0" />
        
        <div className={`absolute top-[4.6875rem] left-1/2 -translate-x-1/2 flex items-center gap-2 text-[0.75rem] font-bold text-zinc-500 uppercase tracking-[0.2em] transition-opacity duration-700 pointer-events-none z-[130] ${
            hasInteracted ? "opacity-0" : "opacity-100 animate-pulse"
          }`}
          aria-hidden="true"
        >
          <ChevronLeft size="0.75rem" className="text-orange-500/80" />
          <span>{swipeHint}</span>
          <ChevronRight size="0.75rem" className="text-orange-500/80" />
        </div>

        <div 
          className="absolute inset-0 z-10 pointer-events-auto touch-pan-y cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleCarouselKeyDown}
        >
          <div 
            ref={circleRef}
            className="absolute left-1/2 top-[-44.375rem] w-[50rem] h-[50rem] rounded-full will-change-transform"
            style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
            role="group"
            aria-roledescription="carousel"
            aria-label={language === "es" ? "Carrusel de navegación" : "Navigation carousel"}
          >
            {MOBILE_ITEMS.map((item, i) => {
              const angle = (i - 2) * ANGLE_STEP;
              const isActive = Math.round((rotation * -1) / ANGLE_STEP) + 2 === i;
              
              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  aria-label={item.isAction
                    ? (language === "es" ? "Cambiar idioma" : "Change language")
                    : item.name}
                  aria-current={!item.isAction && pathname === item.href ? "page" : undefined}
                  aria-pressed={item.isAction ? undefined : isActive}
                  className={`absolute top-1/2 left-1/2 flex items-center justify-center font-display tracking-[0.15em] font-bold text-[0.75rem] transition-all duration-300 pointer-events-auto bg-transparent border-0 cursor-pointer ${isActive ? 'text-zinc-900' : 'text-zinc-400 opacity-60'}`}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(23.125rem) scale(${isActive ? 1.1 : 0.8})`,
                    padding: "0.9375rem",
                  }}
                  onClick={() => activateMobileItem(i)}
                  onKeyDown={(e) => handleItemKeyDown(e, i)}
                >
                  <span className="relative">
                    {item.name}
                    {isActive && pathname === item.href && !item.isAction && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" aria-hidden="true" />
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}