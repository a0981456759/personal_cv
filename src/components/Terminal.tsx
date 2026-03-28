"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommandInput, { CommandInputHandle } from "./CommandInput";
import PanelBorder from "./PanelBorder";
import PanelSidebar, { FILE_TREE } from "./PanelSidebar";
import PanelContent from "./PanelContent";
import PanelInfo from "./PanelInfo";
import { executeCommand } from "@/lib/commands";
import { BOOT_LINES } from "@/lib/ascii";
import type { Lang } from "@/data/content";

type PanelFocus = "sidebar" | "content" | "command";

type BootLine = {
  id: number;
  text: string;
  color: string;
};

const FOCUS_ORDER: PanelFocus[] = ["sidebar", "content", "command"];

const Terminal = () => {
  const [phase, setPhase] = useState<"boot" | "ready">("boot");
  const [bootLines, setBootLines] = useState<BootLine[]>([]);
  const [bootIndex, setBootIndex] = useState(0);
  const [focusedPanel, setFocusedPanel] = useState<PanelFocus>("sidebar");
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [mobileTab, setMobileTab] = useState<"files" | "content">("files");
  const [lang, setLang] = useState<Lang>("en");
  const inputRef = useRef<CommandInputHandle>(null);
  const lineIdRef = useRef(0);

  const nextId = () => lineIdRef.current++;

  const handleCommandRef = useRef<(input: string) => void>(() => {});

  // Derive content from selected file or command output
  const selectedFile = FILE_TREE[selectedFileIndex];
  const [commandOutput, setCommandOutput] = useState<{ command: string; output: React.ReactNode } | null>(null);
  const fileResult = executeCommand(selectedFile.command, handleCommandRef.current, lang);
  const contentResult = commandOutput ?? fileResult;

  const handleCommand = useCallback((input: string) => {
    const trimmed = input.trim().toLowerCase();

    if (trimmed === "clear") {
      setCommandOutput(null);
      return;
    }

    // Check if command matches a file in the tree
    const fileIndex = FILE_TREE.findIndex(
      (f) => f.command.toLowerCase() === trimmed
    );
    if (fileIndex !== -1) {
      setCommandOutput(null);
      setSelectedFileIndex(fileIndex);
      setFocusedPanel("content");
      setMobileTab("content");
      return;
    }

    // For non-file commands (help, whoami, etc.), show in content panel
    const result = executeCommand(input, handleCommandRef.current, lang);
    if (result) {
      setCommandOutput(result);
      setFocusedPanel("content");
      setMobileTab("content");
    }
  }, []);

  handleCommandRef.current = handleCommand;

  const handleFileSelect = useCallback((index: number) => {
    setSelectedFileIndex(index);
    setMobileTab("content");
  }, []);

  // Tab cycling for panel focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== "ready") return;

      // Tab cycles focus (only when not in command input)
      if (e.key === "Tab" && !e.ctrlKey && !e.metaKey) {
        const activeEl = document.activeElement;
        const isInInput = activeEl?.tagName === "INPUT";

        if (!isInInput || focusedPanel === "command") {
          e.preventDefault();
          const currentIdx = FOCUS_ORDER.indexOf(focusedPanel);
          const nextIdx = e.shiftKey
            ? (currentIdx - 1 + FOCUS_ORDER.length) % FOCUS_ORDER.length
            : (currentIdx + 1) % FOCUS_ORDER.length;
          const next = FOCUS_ORDER[nextIdx];
          setFocusedPanel(next);
          if (next === "command") {
            inputRef.current?.focus();
          }
        }
      }

      // Number keys 1-7 jump to file
      const num = parseInt(e.key);
      if (num >= 1 && num <= FILE_TREE.length && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeEl = document.activeElement;
        if (activeEl?.tagName !== "INPUT") {
          setSelectedFileIndex(num - 1);
          setFocusedPanel("sidebar");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, focusedPanel]);

  // Focus command input when panel switches to command
  useEffect(() => {
    if (focusedPanel === "command" && phase === "ready") {
      inputRef.current?.focus();
    }
  }, [focusedPanel, phase]);

  // Boot sequence
  useEffect(() => {
    if (phase !== "boot") return;

    if (bootIndex < BOOT_LINES.length) {
      const timer = setTimeout(() => {
        setBootLines((prev) => [
          ...prev,
          { id: nextId(), text: BOOT_LINES[bootIndex].text, color: BOOT_LINES[bootIndex].color },
        ]);
        setBootIndex((i) => i + 1);
      }, BOOT_LINES[bootIndex].delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhase("ready");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [phase, bootIndex]);

  // Boot screen
  if (phase === "boot") {
    return (
      <div className="min-h-[calc(100vh-52px)] flex items-center justify-center">
        <div className="space-y-1 font-mono text-sm">
          <AnimatePresence>
            {bootLines.map((line) => (
              <motion.p
                key={line.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className={line.color}
              >
                {line.text}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Panel layout
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-[calc(100vh-52px)]"
    >
      {/* Desktop layout */}
      <div className="hidden md:flex flex-1 gap-0 p-3 min-h-0">
        {/* Sidebar */}
        <div className="w-52 shrink-0">
          <PanelBorder
            title="Files"
            focused={focusedPanel === "sidebar"}
            className="h-full cursor-pointer"
          >
            <div onClick={() => setFocusedPanel("sidebar")}>
              <PanelSidebar
                selectedIndex={selectedFileIndex}
                onSelect={handleFileSelect}
                focused={focusedPanel === "sidebar"}
              />
            </div>
          </PanelBorder>
        </div>

        {/* Content */}
        <div className="flex-1 ml-3 min-w-0">
          <PanelBorder
            title="Content"
            focused={focusedPanel === "content"}
            className="h-full cursor-pointer"
          >
            <div
              className="h-full"
              onClick={() => setFocusedPanel("content")}
            >
              {contentResult && (
                <PanelContent
                  command={contentResult.command}
                  output={contentResult.output}
                  focused={focusedPanel === "content"}
                />
              )}
            </div>
          </PanelBorder>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden flex-col flex-1 min-h-0">
        {/* Tab switcher */}
        <div className="flex border-b border-terminal-border">
          <button
            onClick={() => { setMobileTab("files"); setFocusedPanel("sidebar"); }}
            className={`flex-1 py-2 text-xs font-mono text-center transition-colors cursor-pointer ${
              mobileTab === "files"
                ? "text-accent-cyan border-b-2 border-accent-cyan"
                : "text-text-secondary"
            }`}
          >
            Files
          </button>
          <button
            onClick={() => { setMobileTab("content"); setFocusedPanel("content"); }}
            className={`flex-1 py-2 text-xs font-mono text-center transition-colors cursor-pointer ${
              mobileTab === "content"
                ? "text-accent-cyan border-b-2 border-accent-cyan"
                : "text-text-secondary"
            }`}
          >
            Content
          </button>
        </div>

        {/* Mobile content area */}
        <div className="flex-1 overflow-y-auto p-3">
          {mobileTab === "files" ? (
            <PanelSidebar
              selectedIndex={selectedFileIndex}
              onSelect={(i) => {
                handleFileSelect(i);
                setMobileTab("content");
              }}
              focused={true}
            />
          ) : (
            contentResult && (
              <PanelContent
                command={contentResult.command}
                output={contentResult.output}
                focused={true}
              />
            )
          )}
        </div>
      </div>

      {/* Info bar */}
      <div className="shrink-0">
        <PanelBorder title="Info" focused={false} className="mx-3 mb-1">
          <div className="flex items-center">
            <div className="flex-1">
              <PanelInfo lang={lang} />
            </div>
            <button
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="text-[10px] font-mono px-2 py-1.5 mr-2 text-text-secondary hover:text-accent-cyan transition-colors cursor-pointer shrink-0"
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
          </div>
        </PanelBorder>
      </div>

      {/* Command input */}
      <div className="shrink-0 px-3 pb-3">
        <div onClick={() => setFocusedPanel("command")}>
          <CommandInput
            ref={inputRef}
            onSubmit={handleCommand}
            disabled={phase !== "ready"}
          />
        </div>
        <div className="text-text-muted text-[10px] font-mono mt-1 px-1">
          Tab: switch panel | 1-7: jump to file | type command + Enter
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;
