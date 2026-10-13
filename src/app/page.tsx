import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Remote } from "@/components/Remote";
import { Services } from "@/components/Services";
import { Showreel } from "@/components/Showreel";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
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
    </>
  );
}
