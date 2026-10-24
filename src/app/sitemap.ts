import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Generated at build time so it works with the static export
export const dynamic = "force-static";

const languages = { es: `${SITE_URL}/`, en: `${SITE_URL}/en` };

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/en`, lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
