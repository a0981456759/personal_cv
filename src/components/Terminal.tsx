"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommandInput, { CommandInputHandle } from "./CommandInput";
import { executeCommand, CommandOutput } from "@/lib/commands";
import { BOOT_LINES } from "@/lib/ascii";

type TerminalLine = {
  id: number;
  type: "boot" | "command" | "system";
  text?: string;
  color?: string;
  command?: string;
  output?: React.ReactNode;
  content?: React.ReactNode;
};

const CHIP_COMMANDS = ["whoami", "cat soul.md", "cat experience.json", "ls projects/", "cat skills.yaml", "cat contact.json"];

const CommandChips = ({ onCommandClick }: { onCommandClick: (cmd: string) => void }) => (
  <div className="flex flex-wrap gap-2 py-3">
    {CHIP_COMMANDS.map((cmd) => (
      <button
        key={cmd}
        onClick={() => onCommandClick(cmd)}
        className="px-3 py-1.5 text-xs bg-terminal-bg-alt text-accent-cyan border border-terminal-border rounded hover:border-accent-cyan/50 transition-colors cursor-pointer"
      >
        {cmd}
      </button>
    ))}
  </div>
);

const Terminal = () => {
  const [phase, setPhase] = useState<"boot" | "ready">("boot");
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [bootIndex, setBootIndex] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<CommandInputHandle>(null);
  const lineIdRef = useRef(0);

  const nextId = () => lineIdRef.current++;

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    bottomRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  // handleCommand needs to be defined with useCallback before the boot effect uses it.
  // We use a ref to break the circular dependency.
  const handleCommandRef = useRef<(input: string) => void>(() => {});

  const handleCommand = useCallback((input: string) => {
    const trimmed = input.trim().toLowerCase();

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const result: CommandOutput | null = executeCommand(input, handleCommandRef.current);
    if (result) {
      setLines((prev) => [
        ...prev,
        { id: nextId(), type: "command" as const, command: result.command, output: result.output },
      ]);
    }
  }, []);

  // Keep the ref in sync
  handleCommandRef.current = handleCommand;

  // Boot sequence
  useEffect(() => {
    if (phase !== "boot") return;

    if (bootIndex < BOOT_LINES.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { id: nextId(), type: "boot", text: BOOT_LINES[bootIndex].text, color: BOOT_LINES[bootIndex].color },
        ]);
        setBootIndex((i) => i + 1);
        scrollToBottom("instant");
      }, BOOT_LINES[bootIndex].delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        const whoamiResult = executeCommand("whoami", handleCommandRef.current);
        const helpResult = executeCommand("help", handleCommandRef.current);

        const newLines: TerminalLine[] = [];
        if (whoamiResult) {
          newLines.push({ id: nextId(), type: "command" as const, command: "whoami", output: whoamiResult.output });
        }
        if (helpResult) {
          newLines.push({ id: nextId(), type: "command" as const, command: "help", output: helpResult.output });
        }
        newLines.push({
          id: nextId(),
          type: "system" as const,
          content: <CommandChips onCommandClick={handleCommandRef.current} />,
        });

        setLines((prev) => [...prev, ...newLines]);
        setPhase("ready");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [phase, bootIndex, scrollToBottom]);

  const handleContainerClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="min-h-[calc(100vh-52px)] flex flex-col"
      onClick={handleContainerClick}
    >
      {/* Output area */}
      <div className="flex-1 space-y-6" role="log" aria-live="polite">
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {line.type === "boot" && (
                <p className={`${line.color} text-sm`}>{line.text}</p>
              )}
              {line.type === "command" && (
                <div className={`space-y-2 ${i > 0 ? "border-t border-terminal-border/20 pt-4" : ""}`}>
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

      {/* Command input */}
      <div className="sticky bottom-0 bg-terminal-bg pt-2 pb-4 md:pb-2">
        <CommandInput ref={inputRef} onSubmit={handleCommand} disabled={phase !== "ready"} />
      </div>
    </div>
  );
};

export default Terminal;
