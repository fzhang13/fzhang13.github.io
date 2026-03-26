import HomeClient from "@/components/HomeClient";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import Writing from "@/components/Writing";

export default function Home() {
  return (
    <>
      <HomeClient>
        <div className="gradient-line" />
        <SectionReveal>
          <About />
        </SectionReveal>
        <div className="gradient-line" />
        <SectionReveal>
          <Expertise />
        </SectionReveal>
        <div className="gradient-line" />
        <SectionReveal>
          <Experience />
        </SectionReveal>
        <div className="gradient-line" />
        <SectionReveal>
          <Projects />
        </SectionReveal>
        <div className="gradient-line" />
        <Writing />
        <div className="gradient-line" />
        <SectionReveal>
          <Contact />
        </SectionReveal>
      </HomeClient>
      <Footer />
    </>
  );
}
