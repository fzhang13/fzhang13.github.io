import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="gradient-line" />
        <About />
        <div className="gradient-line" />
        <Expertise />
        <div className="gradient-line" />
        <Experience />
        <div className="gradient-line" />
        <Projects />
        <div className="gradient-line" />
        <Education />
        <div className="gradient-line" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
