"use client";

import { useState } from "react";
import BootSequence from "@/components/BootSequence";
import TerminalWindow from "@/components/TerminalWindow";
import TerminalNav from "@/components/TerminalNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      {booted && (
        <TerminalWindow>
          <TerminalNav />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
        </TerminalWindow>
      )}
    </>
  );
}
