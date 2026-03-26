"use client";

import { useCallback, useEffect } from "react";

export interface FileEntry {
  name: string;
  command: string;
}

export const FILE_TREE: FileEntry[] = [
  { name: "soul.md", command: "cat soul.md" },
  { name: "experience.json", command: "cat experience.json" },
  { name: "projects/", command: "ls projects/" },
  { name: "achievements.md", command: "cat achievements.md" },
  { name: "skills.md", command: "cat skills.md" },
  { name: "education.md", command: "cat education.md" },
  { name: "contact.json", command: "cat contact.json" },
];

interface PanelSidebarProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
  focused: boolean;
}

const PanelSidebar = ({ selectedIndex, onSelect, focused }: PanelSidebarProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!focused) return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        onSelect(selectedIndex > 0 ? selectedIndex - 1 : FILE_TREE.length - 1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        onSelect(selectedIndex < FILE_TREE.length - 1 ? selectedIndex + 1 : 0);
      }
    },
    [focused, selectedIndex, onSelect]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="py-2 font-mono text-sm" role="listbox" aria-label="File tree">
      {FILE_TREE.map((file, i) => {
        const isSelected = i === selectedIndex;
        const isDir = file.name.endsWith("/");

        return (
          <button
            key={file.name}
            onClick={() => onSelect(i)}
            role="option"
            aria-selected={isSelected}
            className={`w-full text-left px-3 py-0.5 flex items-center gap-2 cursor-pointer transition-colors ${
              isSelected
                ? "bg-terminal-bg-alt text-accent-cyan"
                : "text-text-primary hover:bg-terminal-bg-alt/50"
            }`}
          >
            <span className={isSelected ? "text-accent-green" : "text-text-muted"}>
              {isSelected ? ">" : " "}
            </span>
            <span className={isDir ? "text-accent-cyan font-bold" : ""}>
              {file.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default PanelSidebar;
