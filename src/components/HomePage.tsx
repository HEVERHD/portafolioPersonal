import type { Lang } from "@/content";
import { LangProvider } from "@/lib/i18n";
import type { RoleId } from "@/roles";
import { About } from "./About";
import { Assistant } from "./Assistant";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { Hero } from "./Hero";
import { Nav } from "./Nav";
import { Remote } from "./Remote";
import { Services } from "./Services";
import { Showreel } from "./Showreel";
import { Work } from "./Work";

/** The whole one-page portfolio, rendered in the language of its route and, on /vtex and the like, aimed at one role. */
export function HomePage({ lang, role }: { lang: Lang; role?: RoleId }) {
  return (
    <LangProvider lang={lang} role={role}>
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
      <Assistant />
    </LangProvider>
  );
}
