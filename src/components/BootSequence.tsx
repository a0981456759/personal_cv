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
