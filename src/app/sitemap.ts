import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { pagePath, ROLE_IDS, type RoleId } from "@/roles";

// Generated at build time so it works with the static export
export const dynamic = "force-static";

/** The general portfolio and each role page, each in Spanish and English and linked to each other. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: (RoleId | undefined)[] = [undefined, ...ROLE_IDS];
  return pages.flatMap((role) => {
    const languages = { es: SITE_URL + pagePath("es", role), en: SITE_URL + pagePath("en", role) };
    const base = role ? 0.8 : 1;
    return [
      { url: languages.es, lastModified, changeFrequency: "monthly", priority: base, alternates: { languages } },
      { url: languages.en, lastModified, changeFrequency: "monthly", priority: base - 0.1, alternates: { languages } },
    ] satisfies MetadataRoute.Sitemap;
  });
}
