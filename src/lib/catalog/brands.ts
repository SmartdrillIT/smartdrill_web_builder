import type { Brand } from "@/types/catalog";

/** Metadatos visuales de cada marca (logo + acentos de color).
 *  logoClass compensa el aire transparente de cada archivo para que todos los
 *  logos se vean del mismo tamaño visual: scale-90 a los densos que llenan la
 *  tarjeta, scale-110/125 a los ralos o con márgenes transparentes. */
export const BRANDS_DATA: Brand[] = [
  { name: "Apple",     color: "ring-zinc-500",   hover: "hover:border-zinc-400 hover:shadow-zinc-500/20",   tint: "group-hover:bg-zinc-900/5",   logo: "/marcas/Apple.png", logoClass: "scale-90" },
  { name: "Samsung",   color: "ring-blue-500",   hover: "hover:border-blue-500 hover:shadow-blue-500/20",   tint: "group-hover:bg-blue-500/10",   logo: "/marcas/Samsung.png", logoClass: "scale-125" },
  { name: "Huawei",    color: "ring-red-500",    hover: "hover:border-red-500 hover:shadow-red-500/20",     tint: "group-hover:bg-red-500/10",    logo: "/marcas/Huawei.png", logoClass: "" },
  { name: "Xiaomi",    color: "ring-orange-500", hover: "hover:border-orange-500 hover:shadow-orange-500/20", tint: "group-hover:bg-orange-500/10", logo: "/marcas/Xiaomi.png", logoClass: "scale-90" },
  { name: "Tecno",     color: "ring-blue-400",   hover: "hover:border-blue-400 hover:shadow-blue-400/20",   tint: "group-hover:bg-blue-400/10",   logo: "/marcas/Tecno Spark.png", logoClass: "scale-90" },
  { name: "Infinix",   color: "ring-green-500",  hover: "hover:border-green-500 hover:shadow-green-500/20",  tint: "group-hover:bg-green-500/10",  logo: "/marcas/Infinix.png", logoClass: "scale-90" },
  { name: "ZTE",       color: "ring-blue-600",   hover: "hover:border-blue-600 hover:shadow-blue-600/20",   tint: "group-hover:bg-blue-600/10",   logo: "/marcas/ZTE.png", logoClass: "scale-90" },
  { name: "OPPO",      color: "ring-green-600",  hover: "hover:border-green-600 hover:shadow-green-600/20",  tint: "group-hover:bg-green-600/10",  logo: "/marcas/OPPO.png", logoClass: "scale-90" },
  { name: "Realme",    color: "ring-yellow-500", hover: "hover:border-yellow-500 hover:shadow-yellow-500/20", tint: "group-hover:bg-yellow-500/10", logo: "/marcas/REALME.png", logoClass: "scale-90" },
  { name: "TCL",       color: "ring-red-700",    hover: "hover:border-red-700 hover:shadow-red-700/20",     tint: "group-hover:bg-red-700/10",   logo: "/marcas/TCL.png", logoClass: "" },
  { name: "Vivo",      color: "ring-blue-800",   hover: "hover:border-blue-800 hover:shadow-blue-800/20",   tint: "group-hover:bg-blue-800/10",   logo: "/marcas/VIVO.png", logoClass: "scale-125" },
  { name: "OnePlus",   color: "ring-red-600",    hover: "hover:border-red-600 hover:shadow-red-600/20",     tint: "group-hover:bg-red-600/10",    logo: "/marcas/ONEPLUS.png", logoClass: "scale-90" },
  { name: "Motorola",  color: "ring-zinc-500",   hover: "hover:border-zinc-400 hover:shadow-zinc-500/20",   tint: "group-hover:bg-zinc-900/5",   logo: "/marcas/MOTOROLA.png", logoClass: "scale-110" },
  { name: "Sony",      color: "ring-black",      hover: "hover:border-black hover:shadow-black/20",         tint: "group-hover:bg-black/10",      logo: "/marcas/SONY.png", logoClass: "scale-125" },
  { name: "LG",        color: "ring-red-700",    hover: "hover:border-red-700 hover:shadow-red-700/20",     tint: "group-hover:bg-red-700/10",    logo: "/marcas/LG.png", logoClass: "scale-125" },
  { name: "Nokia",     color: "ring-blue-500",   hover: "hover:border-blue-500 hover:shadow-blue-500/20",   tint: "group-hover:bg-blue-500/10",   logo: "/marcas/NOKIA.png", logoClass: "scale-125" },
  { name: "HTC",       color: "ring-green-700",  hover: "hover:border-green-700 hover:shadow-green-700/20",  tint: "group-hover:bg-green-700/10",  logo: "/marcas/HTC.png", logoClass: "scale-110" },
  { name: "Honor",     color: "ring-slate-500",  hover: "hover:border-slate-400 hover:shadow-slate-500/20", tint: "group-hover:bg-slate-900/5", logo: "/marcas/Honor.png", logoClass: "scale-125" },
];
