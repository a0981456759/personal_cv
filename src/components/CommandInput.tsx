"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { getCommandNames } from "@/lib/commands";

interface CommandInputProps {
  onSubmit: (command: string) => void;
  disabled?: boolean;
}

const CommandInput = ({ onSubmit, disabled }: CommandInputProps) => {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount and when clicking anywhere in terminal
  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit(value);
      setHistory((prev) => [value, ...prev]);
      setValue("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setValue(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setValue(history[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setValue("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = getCommandNames();
      const match = commands.find((cmd) => cmd.startsWith(value.toLowerCase()));
      if (match) {
        setValue(match);
      }
    }
  };

  return (
    <div className="flex items-center gap-2 py-2 font-mono">
      <span className="text-accent-green shrink-0">$</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1 bg-transparent text-text-primary outline-none caret-accent-green placeholder:text-text-muted"
        placeholder={disabled ? "" : "type a command..."}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  );
};

export default CommandInput;
