"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

interface HomeClientProps {
  children: React.ReactNode;
}

export default function HomeClient({ children }: HomeClientProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <Navbar revealed={revealed} />
      <main>
        <Hero revealed={revealed} onReveal={() => setRevealed(true)} />
        {children}
      </main>
    </>
  );
}
