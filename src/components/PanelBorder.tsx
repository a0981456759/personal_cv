"use client";

interface PanelBorderProps {
  title: string;
  focused: boolean;
  children: React.ReactNode;
  className?: string;
}

const PanelBorder = ({ title, focused, children, className = "" }: PanelBorderProps) => {
  return (
    <div
      className={`relative border rounded ${
        focused ? "border-accent-cyan" : "border-terminal-border"
      } ${className}`}
    >
      <div
        className={`absolute -top-2.5 left-3 px-1.5 text-xs font-mono bg-terminal-bg ${
          focused ? "text-accent-cyan" : "text-text-secondary"
        }`}
      >
        {title}
      </div>
      {children}
    </div>
  );
};

export default PanelBorder;
