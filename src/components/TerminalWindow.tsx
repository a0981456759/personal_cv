"use client";

interface TerminalWindowProps {
  children: React.ReactNode;
}

const TerminalWindow = ({ children }: TerminalWindowProps) => {
  return (
    <div className="min-h-screen bg-terminal-bg">
      {/* Window Chrome */}
      <div className="sticky top-0 z-50 bg-terminal-bg-alt border-b border-terminal-border">
        <div className="px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-accent-red/80" />
            <div className="w-3 h-3 rounded-full bg-accent-yellow/80" />
            <div className="w-3 h-3 rounded-full bg-accent-green/80" />
          </div>
          <span className="text-text-secondary text-xs ml-2">
            howard@cv — zsh — 80x24
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
