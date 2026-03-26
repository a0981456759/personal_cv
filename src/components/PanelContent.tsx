"use client";

import { useRef, useEffect } from "react";

interface PanelContentProps {
  command: string;
  output: React.ReactNode;
  focused: boolean;
}

const PanelContent = ({ command, output, focused }: PanelContentProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [command]);

  return (
    <div
      ref={scrollRef}
      className="p-4 overflow-y-auto font-mono"
      style={{ height: "100%" }}
      tabIndex={focused ? 0 : -1}
      role="region"
      aria-label="Content panel"
    >
      <div className="flex items-center gap-2 mb-4 text-sm">
        <span className="text-accent-green">$</span>
        <span className="text-text-primary">{command}</span>
      </div>
      <div>{output}</div>
    </div>
  );
};

export default PanelContent;
