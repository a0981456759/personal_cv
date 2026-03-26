"use client";

import { useEffect, useState } from "react";

const sections = [
  { key: "1", label: "about", id: "about" },
  { key: "2", label: "experience", id: "experience" },
  { key: "3", label: "projects", id: "projects" },
  { key: "4", label: "achievements", id: "achievements" },
  { key: "5", label: "contact", id: "contact" },
];

const TerminalNav = () => {
  const [activeSection, setActiveSection] = useState("");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const section = sections.find((s) => s.key === e.key);
      if (section) {
        scrollToSection(section.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: top bar inside terminal */}
      <div className="hidden md:flex items-center gap-1 py-2 mb-6 text-xs border-b border-terminal-border">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => scrollToSection(s.id)}
            className={`px-2 py-1 rounded transition-colors ${
              activeSection === s.id
                ? "text-accent-cyan bg-terminal-bg-highlight"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <span className="text-accent-yellow">[{s.key}]</span>{" "}
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile: bottom tab bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-terminal-bg-alt border-t border-terminal-border">
        <div className="flex items-center justify-around py-2">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => scrollToSection(s.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs transition-colors ${
                activeSection === s.id
                  ? "text-accent-cyan"
                  : "text-text-secondary"
              }`}
            >
              <span className="text-[10px] text-accent-yellow">{s.key}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TerminalNav;
