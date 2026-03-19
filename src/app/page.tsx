"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <Navbar revealed={revealed} />
      <main>
        <Hero revealed={revealed} onReveal={() => setRevealed(true)} />
        <div className="gradient-line" />
        <About />
        <div className="gradient-line" />
        <Expertise />
        <div className="gradient-line" />
        <Experience />
        <div className="gradient-line" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
