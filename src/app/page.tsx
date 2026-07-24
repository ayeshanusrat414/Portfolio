import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Graphics } from "@/components/sections/Graphics";
import { Websites } from "@/components/sections/Websites";
import { Research } from "@/components/sections/Research";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Graphics />
      <Websites />
      <Research />
      <Education />
      <Certifications />
      <Resume />
      <Contact />
    </>
  );
}
