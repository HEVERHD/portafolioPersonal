import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { LANGUAGE_ALTERNATES, SITE_DESCRIPTION_EN, SITE_TITLE_EN } from "@/lib/site";

// English edition of the portfolio; its social image is en/opengraph-image.png
export const metadata: Metadata = {
  title: SITE_TITLE_EN,
  description: SITE_DESCRIPTION_EN,
  alternates: { canonical: "/en", languages: LANGUAGE_ALTERNATES },
  openGraph: {
    title: SITE_TITLE_EN,
    description: "React · React Native · Next.js. Web and mobile apps in production, from idea to app stores.",
    url: "/en",
    siteName: "Hevert Gelis",
    locale: "en_US",
    type: "profile",
    firstName: "Hevert",
    lastName: "Gelis",
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE_EN },
};

export default function HomeEn() {
  return <HomePage lang="en" />;
}
