'use client';

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FALLBACK_IMG, type ServiceData } from "./services-data";

const GRID_CLASSES: Record<ServiceData["size"], string> = {
  wide: "lg:col-span-2",
  tall: "lg:row-span-2",
  normal: "",
};

export default function ServiceCard({ title, desc, img, size }: ServiceData) {
  const [src, setSrc] = useState(img);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
      whileHover={{ scale: 0.98 }}
      className={`group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#1c1c1e] border border-zinc-200 dark:border-zinc-800 transition-all duration-500 ${GRID_CLASSES[size]}`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={src}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          onError={() => setSrc(FALLBACK_IMG)}
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white/90 dark:to-[#1c1c1e]/90 dark:via-black/40" />
      </div>
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{title}</h3>
        <p className="text-zinc-700 dark:text-zinc-300 text-sm font-medium">{desc}</p>
      </div>
    </motion.div>
  );
}
