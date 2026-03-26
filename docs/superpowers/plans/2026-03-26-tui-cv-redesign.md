# TUI CV Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign pdzeng.com from a white minimal single-page CV into a Pure Terminal (TUI) style portfolio inspired by Claude Code CLI, using Tokyo Night color scheme, monospace typography, and command-prompt section navigation.

**Architecture:** Single-column terminal buffer layout (`max-w-3xl`, centered). Each section is introduced by a `$ command` prompt with typing animation. Outer terminal window chrome wraps the entire page. Keyboard navigation via `[1-5]` shortcut keys. Mobile uses bottom tab bar. No real CLI input, no AI chatbot.

**Tech Stack:** Next.js 15, React 18, Tailwind CSS 3, Framer Motion, TypeScript, JetBrains Mono (Google Fonts), Noto Sans TC

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              (MODIFY: swap fonts to JetBrains Mono + Noto Sans TC)
│   ├── globals.css             (REWRITE: dark theme, terminal utilities, cursor blink)
│   └── page.tsx                (REWRITE: new component composition)
├── components/
│   ├── TerminalWindow.tsx      (CREATE: outer window chrome - dots + title bar)
│   ├── TerminalPrompt.tsx      (CREATE: reusable $ command prompt with typing animation)
│   ├── TerminalNav.tsx         (CREATE: [1-5] keyboard shortcut nav bar)
│   ├── BootSequence.tsx        (CREATE: initial boot text animation)
│   ├── Navbar.tsx              (DELETE: replaced by TerminalNav)
│   ├── Hero.tsx                (REWRITE: $ whoami output)
│   ├── About.tsx               (REWRITE: $ cat about.md)
│   ├── Experience.tsx          (REWRITE: $ cat experience.json | jq)
│   ├── Projects.tsx            (REWRITE: $ ls -la projects/)
│   ├── Achievements.tsx        (REWRITE: $ cat achievements.md)
│   └── Contact.tsx             (REWRITE: $ cat contact.json + footer)
├── data/
│   └── content.ts              (MODIFY: update footer text)
tailwind.config.ts              (REWRITE: Tokyo Night palette, mono fonts)
```

---

### Task 1: Tailwind Config - Tokyo Night Theme

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Rewrite tailwind.config.ts with Tokyo Night palette and mono fonts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#1a1b26",
          "bg-alt": "#24283b",
          "bg-highlight": "#292e42",
          border: "#3b4261",
        },
        text: {
          primary: "#c0caf5",
          secondary: "#565f89",
          muted: "#3b4261",
        },
        accent: {
          green: "#9ece6a",
          cyan: "#7dcfff",
          yellow: "#e0af68",
          purple: "#bb9af7",
          red: "#f7768e",
          orange: "#ff9e64",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Noto Sans TC"', "monospace"],
      },
      maxWidth: {
        terminal: "768px",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-in": "fadeIn 0.3s ease-out",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Verify build compiles**

Run: `cd /Users/panda/site/personal/apps/personal-cv && npx next build 2>&1 | tail -5`
Expected: Build succeeds (may have warnings about unused old classes, that's fine)

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "refactor: replace white theme with Tokyo Night terminal palette"
```

---

### Task 2: Global CSS - Dark Terminal Base

**Files:**
- Rewrite: `src/app/globals.css`

- [ ] **Step 1: Rewrite globals.css with dark terminal base styles**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-terminal-bg text-text-primary antialiased font-mono;
    font-size: 14px;
    line-height: 1.7;
  }

  ::selection {
    @apply bg-accent-purple/30 text-text-primary;
  }

  /* Scrollbar styling for terminal feel */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    @apply bg-terminal-bg;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-terminal-border rounded;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-text-secondary;
  }
}

@layer utilities {
  .terminal-prompt {
    @apply text-accent-green font-mono;
  }

  .terminal-command {
    @apply text-text-primary font-mono;
  }

  .terminal-comment {
    @apply text-text-secondary font-mono italic;
  }

  .terminal-link {
    @apply text-accent-cyan underline underline-offset-2 decoration-accent-cyan/40 hover:decoration-accent-cyan transition-colors;
  }

  .terminal-tag {
    @apply inline-block px-2 py-0.5 text-xs bg-terminal-bg-alt text-accent-yellow border border-terminal-border rounded;
  }

  .cursor-blink {
    @apply inline-block w-2 h-4 bg-accent-green animate-blink ml-1;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add dark terminal base styles and utility classes"
```

---

### Task 3: Layout - Swap Fonts

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Rewrite layout.tsx to use JetBrains Mono + Noto Sans TC**

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-tc",
});

export const metadata: Metadata = {
  title: "panda@cv ~ %",
  description: "Panda Tseng | Crypto PM, Builder, KOL — Terminal CV",
  keywords: ["Web3", "Crypto", "Product Manager", "DeFi", "Blockchain", "KOL"],
  authors: [{ name: "Panda Tseng" }],
  openGraph: {
    title: "panda@cv ~ % whoami",
    description: "Panda Tseng — Building the bridge between TradFi & Web3",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${jetbrainsMono.variable} ${notoSansTC.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/panda/site/personal/apps/personal-cv && npx next build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "refactor: swap fonts to JetBrains Mono + Noto Sans TC"
```

---

### Task 4: TerminalWindow - Outer Chrome

**Files:**
- Create: `src/components/TerminalWindow.tsx`

- [ ] **Step 1: Create TerminalWindow component**

This is the outermost wrapper — window chrome dots (red/yellow/green) + title bar. Wraps all page content.

```tsx
"use client";

interface TerminalWindowProps {
  children: React.ReactNode;
}

const TerminalWindow = ({ children }: TerminalWindowProps) => {
  return (
    <div className="min-h-screen bg-terminal-bg">
      {/* Window Chrome - Title Bar */}
      <div className="sticky top-0 z-50 bg-terminal-bg-alt border-b border-terminal-border">
        <div className="max-w-terminal mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-accent-red/80" />
            <div className="w-3 h-3 rounded-full bg-accent-yellow/80" />
            <div className="w-3 h-3 rounded-full bg-accent-green/80" />
          </div>
          {/* Title */}
          <span className="text-text-secondary text-xs ml-2">
            panda@cv — zsh — 80x24
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="max-w-terminal mx-auto px-4 sm:px-6 py-8">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalWindow.tsx
git commit -m "feat: add TerminalWindow chrome wrapper component"
```

---

### Task 5: TerminalPrompt - Reusable Command Prompt

**Files:**
- Create: `src/components/TerminalPrompt.tsx`

- [ ] **Step 1: Create TerminalPrompt component**

Renders a `$ command` line with optional typing animation triggered by IntersectionObserver.

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface TerminalPromptProps {
  command: string;
  animate?: boolean;
  typingSpeed?: number;
}

const TerminalPrompt = ({
  command,
  animate = true,
  typingSpeed = 30,
}: TerminalPromptProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayedText, setDisplayedText] = useState(animate ? "" : command);
  const [isDone, setIsDone] = useState(!animate);

  useEffect(() => {
    if (!animate || !isInView) return;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(command.slice(0, i));
      if (i >= command.length) {
        clearInterval(interval);
        setIsDone(true);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [animate, command, isInView, typingSpeed]);

  return (
    <div ref={ref} className="flex items-center gap-2 py-2 font-mono">
      <span className="text-accent-green shrink-0">$</span>
      <span className="text-text-primary">{displayedText}</span>
      {!isDone && <span className="cursor-blink" />}
    </div>
  );
};

export default TerminalPrompt;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalPrompt.tsx
git commit -m "feat: add TerminalPrompt with typing animation"
```

---

### Task 6: TerminalNav - Keyboard Shortcut Navigation

**Files:**
- Create: `src/components/TerminalNav.tsx`

- [ ] **Step 1: Create TerminalNav component**

Fixed navigation bar showing `[1] about [2] experience ...` that responds to keyboard number keys. On mobile, renders as bottom tab bar.

```tsx
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
      // Don't intercept if user is typing in an input
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalNav.tsx
git commit -m "feat: add TerminalNav with keyboard shortcuts and mobile tab bar"
```

---

### Task 7: BootSequence - Startup Animation

**Files:**
- Create: `src/components/BootSequence.tsx`

- [ ] **Step 1: Create BootSequence component**

Shows 3-4 quick boot lines, then fades away. Total duration < 1.5s.

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "panda-cv v1.0.0", color: "text-accent-green" },
  { text: "loading modules... done", color: "text-text-secondary" },
  { text: "connecting to pdzeng.com... ok", color: "text-text-secondary" },
  { text: "ready.", color: "text-accent-cyan" },
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const timer = setTimeout(
        () => setVisibleLines((v) => v + 1),
        visibleLines === 0 ? 200 : 250
      );
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setFadingOut(true);
        setTimeout(onComplete, 300);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, onComplete]);

  return (
    <AnimatePresence>
      {!fadingOut && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-terminal-bg flex items-center justify-center"
        >
          <div className="font-mono text-sm space-y-1 max-w-terminal px-6">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={line.color}
              >
                {line.text}
              </motion.div>
            ))}
            {visibleLines < bootLines.length && (
              <span className="cursor-blink" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BootSequence.tsx
git commit -m "feat: add BootSequence startup animation"
```

---

### Task 8: Hero Section - $ whoami

**Files:**
- Rewrite: `src/components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero.tsx as terminal whoami output**

```tsx
"use client";

import { motion } from "framer-motion";
import TerminalPrompt from "./TerminalPrompt";
import { personalInfo } from "@/data/content";

const ASCII_PANDA = `
    .--.              .--.
   |o_o |            |o_o |
   |:_/ |            |:_/ |
  //   \\ \\          // \\   \\
 (|     | )        (|     | )
/'\\_   _/\`\\      /'\\_   _/\`\\
\\___)=(___/      \\___)=(___/
`;

const Hero = () => {
  return (
    <section className="mb-12">
      {/* ASCII Art */}
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-accent-green text-[10px] sm:text-xs leading-tight mb-6 hidden sm:block"
        aria-hidden="true"
      >
        {ASCII_PANDA}
      </motion.pre>

      <TerminalPrompt command="whoami" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="ml-4 space-y-1 mt-2"
      >
        <p className="text-xl sm:text-2xl font-bold text-text-primary">
          {personalInfo.name}
        </p>
        <p className="text-accent-purple">{personalInfo.title}</p>
        <p className="text-text-secondary">{personalInfo.tagline}</p>
        <p className="text-text-secondary text-sm mt-2">
          <span className="text-accent-yellow">location:</span> {personalInfo.location}
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: rewrite Hero as terminal whoami output"
```

---

### Task 9: About Section - $ cat about.md

**Files:**
- Rewrite: `src/components/About.tsx`

- [ ] **Step 1: Rewrite About.tsx as terminal cat output**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TerminalPrompt from "./TerminalPrompt";
import { about } from "@/data/content";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="about" ref={ref} className="mb-12">
      <TerminalPrompt command="cat about.md" />

      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="ml-4 mt-2 space-y-4"
        >
          {/* Markdown-style header */}
          <p className="text-accent-purple font-bold"># {about.headline}</p>

          {about.description.map((paragraph, i) => (
            <p key={i} className="text-text-primary leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Highlights as bullet list */}
          <div className="mt-4 space-y-1">
            <p className="text-accent-purple font-bold">## Highlights</p>
            {about.highlights.map((h, i) => (
              <p key={i} className="text-text-primary">
                <span className="text-accent-yellow">-</span> {h}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default About;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: rewrite About as terminal cat about.md output"
```

---

### Task 10: Experience Section - $ cat experience.json | jq

**Files:**
- Rewrite: `src/components/Experience.tsx`

- [ ] **Step 1: Rewrite Experience.tsx as JSON-style terminal output**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TerminalPrompt from "./TerminalPrompt";
import { experiences } from "@/data/content";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="experience" ref={ref} className="mb-12">
      <TerminalPrompt command='cat experience.json | jq ".[]"' />

      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="ml-4 mt-2 space-y-6"
        >
          {experiences.map((exp, index) => (
            <div key={index} className="space-y-1">
              {/* JSON-style block */}
              <p className="text-text-muted">{"{"}</p>
              <div className="ml-4 space-y-0.5">
                <p>
                  <span className="text-accent-cyan">&quot;company&quot;</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-accent-green">&quot;{exp.company}&quot;</span>
                  <span className="text-text-secondary">,</span>
                </p>
                <p>
                  <span className="text-accent-cyan">&quot;role&quot;</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-accent-green">&quot;{exp.position}&quot;</span>
                  <span className="text-text-secondary">,</span>
                </p>
                <p>
                  <span className="text-accent-cyan">&quot;period&quot;</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-accent-orange">&quot;{exp.period}&quot;</span>
                  <span className="text-text-secondary">,</span>
                </p>
                <p>
                  <span className="text-accent-cyan">&quot;location&quot;</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-accent-green">&quot;{exp.location}&quot;</span>
                  <span className="text-text-secondary">,</span>
                </p>
                <p>
                  <span className="text-accent-cyan">&quot;description&quot;</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-text-primary">&quot;{exp.description}&quot;</span>
                  <span className="text-text-secondary">,</span>
                </p>
                <p>
                  <span className="text-accent-cyan">&quot;achievements&quot;</span>
                  <span className="text-text-secondary">: [</span>
                </p>
                <div className="ml-4">
                  {exp.achievements.map((a, i) => (
                    <p key={i} className="text-text-primary">
                      <span className="text-accent-green">&quot;{a}&quot;</span>
                      {i < exp.achievements.length - 1 && (
                        <span className="text-text-secondary">,</span>
                      )}
                    </p>
                  ))}
                </div>
                <p className="text-text-secondary">],</p>
                <p>
                  <span className="text-accent-cyan">&quot;tags&quot;</span>
                  <span className="text-text-secondary">: [</span>
                  {exp.tags.map((tag, i) => (
                    <span key={i}>
                      <span className="text-accent-yellow">&quot;{tag}&quot;</span>
                      {i < exp.tags.length - 1 && (
                        <span className="text-text-secondary">, </span>
                      )}
                    </span>
                  ))}
                  <span className="text-text-secondary">]</span>
                </p>
              </div>
              <p className="text-text-muted">{"}"}</p>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Experience;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "feat: rewrite Experience as JSON terminal output"
```

---

### Task 11: Projects Section - $ ls -la projects/

**Files:**
- Rewrite: `src/components/Projects.tsx`

- [ ] **Step 1: Rewrite Projects.tsx as ls -la style output**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TerminalPrompt from "./TerminalPrompt";
import { projects } from "@/data/content";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="projects" ref={ref} className="mb-12">
      <TerminalPrompt command="ls -la projects/" />

      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="ml-4 mt-2 space-y-6"
        >
          {/* ls header */}
          <p className="text-text-secondary text-sm">
            total {projects.length}
          </p>

          {projects.map((project, index) => (
            <div key={index} className="space-y-2">
              {/* File listing line */}
              <p className="text-sm">
                <span className="text-accent-green">drwxr-xr-x</span>
                <span className="text-text-secondary">  panda  </span>
                <span className="text-accent-cyan font-bold">
                  {project.name}/
                </span>
              </p>

              {/* Project details as cat output */}
              <div className="ml-4 p-4 bg-terminal-bg-alt rounded border border-terminal-border">
                <p className="text-text-primary mb-2">{project.description}</p>

                {project.highlights.map((h, i) => (
                  <p key={i} className="text-text-secondary text-sm">
                    <span className="text-accent-green">+</span> {h}
                  </p>
                ))}

                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="terminal-tag">{tag}</span>
                  ))}
                </div>

                {project.link && project.link !== "#" && (
                  <p className="mt-2 text-sm">
                    <span className="text-accent-yellow">url:</span>{" "}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terminal-link"
                    >
                      {project.link}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: rewrite Projects as ls -la terminal output"
```

---

### Task 12: Achievements Section - $ cat achievements.md

**Files:**
- Rewrite: `src/components/Achievements.tsx`

- [ ] **Step 1: Rewrite Achievements.tsx as markdown terminal output**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TerminalPrompt from "./TerminalPrompt";
import { achievements } from "@/data/content";

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="achievements" ref={ref} className="mb-12">
      <TerminalPrompt command="cat achievements.md" />

      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="ml-4 mt-2 space-y-6"
        >
          {achievements.map((category, ci) => (
            <div key={ci} className="space-y-2">
              <p className="text-accent-purple font-bold">
                ## {category.category}
              </p>

              {/* Table-style output */}
              <div className="overflow-x-auto">
                <table className="text-sm w-full">
                  <thead>
                    <tr className="text-text-secondary border-b border-terminal-border">
                      <th className="text-left pr-4 py-1 font-normal">TITLE</th>
                      <th className="text-left pr-4 py-1 font-normal">COMPETITION</th>
                      <th className="text-left pr-4 py-1 font-normal">YEAR</th>
                      <th className="text-left py-1 font-normal">LOCATION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.awards.map((award, ai) => (
                      <tr key={ai} className="border-b border-terminal-border/30">
                        <td className="pr-4 py-2 text-accent-yellow font-bold whitespace-nowrap">
                          {award.title}
                        </td>
                        <td className="pr-4 py-2 text-text-primary">
                          {award.link ? (
                            <a
                              href={award.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="terminal-link"
                            >
                              {award.competition}
                            </a>
                          ) : (
                            award.competition
                          )}
                        </td>
                        <td className="pr-4 py-2 text-accent-orange whitespace-nowrap">
                          {award.year}
                        </td>
                        <td className="py-2 text-text-secondary whitespace-nowrap">
                          {award.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Achievements;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Achievements.tsx
git commit -m "feat: rewrite Achievements as markdown table terminal output"
```

---

### Task 13: Contact Section - $ cat contact.json + Footer

**Files:**
- Rewrite: `src/components/Contact.tsx`
- Modify: `src/data/content.ts` (update footer text)

- [ ] **Step 1: Rewrite Contact.tsx as JSON terminal output with footer**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import TerminalPrompt from "./TerminalPrompt";
import { socialLinks, footer } from "@/data/content";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const links = [
    { key: "email", value: socialLinks.email, href: `mailto:${socialLinks.email}`, onClick: copyEmail },
    { key: "telegram", value: "t.me/FinalFantasty", href: socialLinks.telegram },
    { key: "twitter", value: "x.com/pandazeng1", href: socialLinks.twitter },
    { key: "linkedin", value: "linkedin.com/in/wei-chieh-tseng", href: socialLinks.linkedin },
    { key: "github", value: "github.com/panda850819", href: socialLinks.github },
    { key: "medium", value: "medium.com/@kiss851990", href: socialLinks.medium },
    { key: "blog", value: "blog.pdzeng.com", href: socialLinks.blog },
  ];

  return (
    <section id="contact" ref={ref} className="mb-12">
      <TerminalPrompt command="cat contact.json" />

      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="ml-4 mt-2"
        >
          <p className="text-text-muted">{"{"}</p>
          <div className="ml-4 space-y-0.5">
            {links.map((link, i) => (
              <p key={link.key}>
                <span className="text-accent-cyan">&quot;{link.key}&quot;</span>
                <span className="text-text-secondary">: </span>
                {link.key === "email" ? (
                  <button
                    onClick={link.onClick}
                    className="text-accent-green hover:underline cursor-pointer"
                    title="Click to copy"
                  >
                    &quot;{link.value}&quot;
                    {copiedEmail && (
                      <span className="text-accent-yellow text-xs ml-2">
                        (copied!)
                      </span>
                    )}
                  </button>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-link"
                  >
                    &quot;{link.value}&quot;
                  </a>
                )}
                {i < links.length - 1 && (
                  <span className="text-text-secondary">,</span>
                )}
              </p>
            ))}
          </div>
          <p className="text-text-muted">{"}"}</p>

          {/* Footer */}
          <div className="mt-16 pt-6 border-t border-terminal-border">
            <p className="text-text-muted text-xs">{footer.copyright}</p>
            <p className="text-text-muted text-xs">{footer.builtWith}</p>
          </div>

          {/* Static cursor at the end */}
          <div className="mt-8 flex items-center gap-2">
            <span className="text-accent-green">$</span>
            <span className="cursor-blink" />
          </div>
        </motion.div>
      )}

      {/* Mobile bottom padding for tab bar */}
      <div className="h-16 md:hidden" />
    </section>
  );
};

export default Contact;
```

- [ ] **Step 2: Update footer text in content.ts**

In `src/data/content.ts`, change the footer object:

```typescript
export const footer = {
  copyright: "© 2025 Panda Tseng. All rights reserved.",
  builtWith: "Powered by Next.js · Styled like a terminal · Not actually a terminal",
};
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx src/data/content.ts
git commit -m "feat: rewrite Contact as JSON output with terminal footer"
```

---

### Task 14: Page Assembly - Wire Everything Together

**Files:**
- Rewrite: `src/app/page.tsx`
- Delete: `src/components/Navbar.tsx`
- Delete: `src/components/Skills.tsx` (if it exists, it's unused)

- [ ] **Step 1: Rewrite page.tsx with new component composition**

```tsx
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
```

- [ ] **Step 2: Delete Navbar.tsx**

```bash
rm src/components/Navbar.tsx
```

- [ ] **Step 3: Delete Skills.tsx if it exists**

```bash
rm -f src/components/Skills.tsx
```

- [ ] **Step 4: Verify the full build**

Run: `cd /Users/panda/site/personal/apps/personal-cv && npx next build 2>&1 | tail -10`
Expected: Build succeeds with no errors

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: wire up TUI layout with boot sequence and terminal window"
```

---

### Task 15: Visual QA and Polish

**Files:**
- May modify any component for minor fixes

- [ ] **Step 1: Start dev server and verify in browser**

Run: `cd /Users/panda/site/personal/apps/personal-cv && npm run dev`

Use Playwright MCP to navigate to `http://localhost:3000` and take a screenshot.

Verify:
1. Boot sequence plays and transitions to main content
2. Dark terminal background throughout
3. Window chrome (dots + title bar) sticky at top
4. Each section has `$ command` prompt
5. JSON formatting in Experience and Contact renders correctly
6. Achievements table is readable
7. Navigation bar shows `[1-5]` shortcuts
8. Keyboard 1-5 keys navigate to sections
9. ASCII art panda displays on desktop
10. No leftover white backgrounds or old styling

- [ ] **Step 2: Mobile responsive check**

Resize browser to 375px width (or use mobile viewport). Verify:
1. Bottom tab bar appears, top nav hidden
2. ASCII art hidden on mobile
3. JSON blocks don't overflow horizontally
4. All text is readable at mobile size
5. Bottom padding exists so content isn't hidden behind tab bar

- [ ] **Step 3: Fix any issues found**

Address visual bugs (if any) based on QA findings.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "fix: visual polish from QA review"
```

---

## Self-Review Checklist

1. **Spec coverage:** All 6 original sections (Hero, About, Experience, Projects, Achievements, Contact) are converted. Boot sequence, terminal window, navigation all covered. No gaps.

2. **Placeholder scan:** All code blocks contain complete implementations. No TBD, TODO, or "fill in later".

3. **Type consistency:** `TerminalPrompt` takes `command: string`, `animate?: boolean`, `typingSpeed?: number` — used consistently. `BootSequence` takes `onComplete: () => void` — used correctly in page.tsx. Data imports (`personalInfo`, `about`, `experiences`, `projects`, `achievements`, `socialLinks`, `footer`) match existing `content.ts` exports.
