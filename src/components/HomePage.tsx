import type { Lang } from "@/content";
import { LangProvider } from "@/lib/i18n";
import { About } from "./About";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { Hero } from "./Hero";
import { Nav } from "./Nav";
import { Remote } from "./Remote";
import { Services } from "./Services";
import { Showreel } from "./Showreel";
import { Work } from "./Work";

/** The whole one-page portfolio, rendered in the language of its route. */
export function HomePage({ lang }: { lang: Lang }) {
  return (
    <LangProvider lang={lang}>
      <Nav />
      <main>
        <Hero />
        <Showreel />
        <Experience />
        <Remote />
        <Work />
        <Services />
        <About />
        <Contact />
      </main>
    </LangProvider>
  );
}
