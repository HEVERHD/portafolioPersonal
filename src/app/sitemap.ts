import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Generated at build time so it works with the static export
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
