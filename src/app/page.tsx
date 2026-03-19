"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";

export default function Home() {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <Navbar revealed={revealed} />
      <main>
        <Hero revealed={revealed} onReveal={() => setRevealed(true)} />
        <div className="gradient-line" />
        <SectionReveal><About /></SectionReveal>
        <div className="gradient-line" />
        <SectionReveal><Expertise /></SectionReveal>
        <div className="gradient-line" />
        <SectionReveal><Experience /></SectionReveal>
        <div className="gradient-line" />
        <SectionReveal><Projects /></SectionReveal>
        <div className="gradient-line" />
        <SectionReveal><Contact /></SectionReveal>
      </main>
      <Footer />
    </>
  );
}
