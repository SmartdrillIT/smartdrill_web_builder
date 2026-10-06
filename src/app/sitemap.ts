import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

const ROUTES = ["/", "/servicios", "/marcas", "/contacto", "/privacidad"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
