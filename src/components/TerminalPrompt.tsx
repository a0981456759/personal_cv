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
