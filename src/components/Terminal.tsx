"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommandInput from "./CommandInput";
import { executeCommand, CommandOutput } from "@/lib/commands";
import { BOOT_LINES } from "@/lib/ascii";

type TerminalLine =
  | { type: "boot"; text: string; color: string }
  | { type: "command"; command: string; output: React.ReactNode }
  | { type: "system"; content: React.ReactNode };

const Terminal = () => {
  const [phase, setPhase] = useState<"boot" | "ready">("boot");
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [bootIndex, setBootIndex] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  // Boot sequence
  useEffect(() => {
    if (phase !== "boot") return;

    if (bootIndex < BOOT_LINES.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { type: "boot", text: BOOT_LINES[bootIndex].text, color: BOOT_LINES[bootIndex].color },
        ]);
        setBootIndex((i) => i + 1);
      }, BOOT_LINES[bootIndex].delay);
      return () => clearTimeout(timer);
    } else {
      // Boot done — auto-run whoami + help hint
      const timer = setTimeout(() => {
        const whoamiResult = executeCommand("whoami");
        const helpHint: TerminalLine = {
          type: "system",
          content: (
            <p className="text-text-secondary text-sm mt-2">
              Type <span className="text-accent-cyan">help</span> to see available commands, or start exploring.
            </p>
          ),
        };

        setLines((prev) => [
          ...prev,
          ...(whoamiResult
            ? [{ type: "command" as const, command: "whoami", output: whoamiResult.output }]
            : []),
          helpHint,
        ]);
        setPhase("ready");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [phase, bootIndex]);

  const handleCommand = (input: string) => {
    const trimmed = input.trim().toLowerCase();

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const result: CommandOutput | null = executeCommand(input);
    if (result) {
      setLines((prev) => [
        ...prev,
        { type: "command", command: result.command, output: result.output },
      ]);
    }
  };

  return (
    <div className="min-h-[calc(100vh-52px)] flex flex-col">
      {/* Output area */}
      <div className="flex-1 space-y-3">
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              {line.type === "boot" && (
                <p className={`${line.color} text-sm`}>{line.text}</p>
              )}
              {line.type === "command" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-accent-green">$</span>
                    <span className="text-text-primary">{line.command}</span>
                  </div>
                  <div className="ml-4">{line.output}</div>
                </div>
              )}
              {line.type === "system" && (
                <div>{line.content}</div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Command input — always at bottom */}
      <div className="sticky bottom-0 bg-terminal-bg pt-2 pb-4 md:pb-2">
        <CommandInput onSubmit={handleCommand} disabled={phase !== "ready"} />
      </div>
    </div>
  );
};

export default Terminal;
