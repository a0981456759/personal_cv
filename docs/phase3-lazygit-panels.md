# Phase 3: Lazygit-Style Panel Architecture

## Overview

Redesign the TUI CV from a single-column terminal buffer to a **multi-panel layout** inspired by lazygit. Multiple panels visible simultaneously, keyboard-driven focus switching, border-highlighted active panel.

## Reference: lazygit

```
+--[ Files ]--------+--[ Diff ]-------------------------------+
| > modified.ts     | @@ -10,6 +10,8 @@                       |
|   added.ts        |  function foo() {                        |
|   deleted.ts      | +  const bar = 1;                        |
|                   | +  return bar;                            |
|                   |  }                                        |
+-------------------+                                          |
| [ Branches ]      |                                          |
| > main            |                                          |
|   feature/tui     |                                          |
+-------------------+------------------------------------------+
| [ Status ] 3 files changed, +12 -5            Tab: switch    |
+--------------------------------------------------------------+
```

Key patterns:
- Fixed panel layout (not scrolling page)
- One panel has focus (highlighted border, e.g. cyan)
- Tab or number keys switch focus between panels
- Focused panel is interactive, others show context
- Status bar at bottom

## Proposed CV Layout

### Desktop (>768px)

```
+--[ panda@cv — zsh ]------------------------------------------+
|                                                               |
| +--[ Files ]--------+--[ Content ]-------------------------+ |
| | > soul.md         |  $ cat soul.md                        | |
| |   experience.json |                                       | |
| |   projects/       |  # About Me                           | |
| |   achievements.md |                                       | |
| |   skills.md       |  你好！我是來自台灣的 Panda Tseng...  | |
| |   education.md    |                                       | |
| |   contact.json    |  ## Highlights                        | |
| |                   |  - WalkinCat 走路貓...                | |
| |                   |  - 多項區塊鏈競賽獎項...              | |
| |                   |  - 全端開發者...                      | |
| |                   |                                       | |
| +-------------------+---------------------------------------+ |
|                                                               |
| +--[ Info ]--------------------------------------------------+|
| | Panda Tseng | 自媒體創作者 · 區塊鏈愛好者 | 台灣          | |
| +------------------------------------------------------------+|
|                                                               |
| $ type a command...                                           |
+---------------------------------------------------------------+
```

### Panels

| Panel | Content | Interaction |
|-------|---------|-------------|
| **Files** (left sidebar) | File tree: soul.md, experience.json, projects/, etc. | Click or arrow keys to select → Content panel updates |
| **Content** (main area) | Output of selected file (same as current command outputs) | Scrollable, links clickable |
| **Info** (bottom bar) | Name, title, location, quick links | Static, always visible |
| **Command** (input) | `$ type a command...` | Same as current — type commands, Tab complete |

### Panel Focus

- **Tab** cycles focus: Files → Content → Command
- **1-7** number keys: jump to file in sidebar
- Active panel has `border-accent-cyan`, inactive panels have `border-terminal-border`
- Files panel: arrow keys navigate, Enter selects
- Content panel: scroll with arrow keys when focused

### Mobile (<768px)

Stack vertically, tab-based:

```
+--[ panda@cv ]----+
| [Files] [Content]|  ← tab switcher
+------------------+
|                  |
| > soul.md        |
|   experience.json|
|   projects/      |
|   ...            |
|                  |
+------------------+
| $ command...     |
+------------------+
```

- Two tabs: Files view / Content view
- Clicking a file switches to Content tab
- Back button returns to Files tab
- Command input always at bottom

## Technical Architecture

### Components

```
src/
├── components/
│   ├── TerminalWindow.tsx     (MODIFY: remove max-w-terminal, full width)
│   ├── Terminal.tsx           (REWRITE: panel layout manager)
│   ├── PanelSidebar.tsx       (CREATE: file tree panel)
│   ├── PanelContent.tsx       (CREATE: main content area)
│   ├── PanelInfo.tsx          (CREATE: bottom info bar)
│   ├── CommandInput.tsx       (KEEP: mostly unchanged)
│   └── PanelBorder.tsx        (CREATE: reusable panel wrapper with focus border)
├── lib/
│   ├── commands.tsx           (KEEP: command outputs reused as content)
│   └── ascii.ts               (KEEP)
```

### State

```typescript
type PanelFocus = "sidebar" | "content" | "command";

interface TerminalState {
  focusedPanel: PanelFocus;
  selectedFile: string;       // e.g. "soul.md", "experience.json"
  commandHistory: string[];
  contentOutput: React.ReactNode;
}
```

### File Tree Data

```typescript
const FILE_TREE = [
  { name: "soul.md", command: "cat soul.md", icon: "📄" },
  { name: "experience.json", command: "cat experience.json", icon: "📄" },
  { name: "projects/", command: "ls projects/", icon: "📁" },
  { name: "achievements.md", command: "cat achievements.md", icon: "📄" },
  { name: "skills.md", command: "cat skills.md", icon: "📄" },
  { name: "education.md", command: "cat education.md", icon: "📄" },
  { name: "contact.json", command: "cat contact.json", icon: "📄" },
];
```

### Panel Border Component

```tsx
interface PanelBorderProps {
  title: string;
  focused: boolean;
  children: React.ReactNode;
}

// Renders a box-drawing character border around content
// Focused: border-accent-cyan, title highlighted
// Unfocused: border-terminal-border, title dimmed
```

Use CSS borders (not box-drawing characters) for reliability:

```
border border-terminal-border rounded
// when focused:
border-accent-cyan
```

Title rendered as inline element overlaying the top border (like fieldset legend).

## Boot Sequence

Keep the current boot sequence, but after boot:
1. Auto-select `soul.md` in sidebar
2. Render `cat soul.md` output in content panel
3. Focus starts on sidebar
4. Info bar shows name + title + location

No more auto-running `whoami` + `help` as separate commands — the panel layout itself IS the navigation.

## What Changes from Phase 2

| Phase 2 (current) | Phase 3 (panels) |
|---|---|
| Single column terminal buffer | Multi-panel fixed layout |
| Commands scroll up in history | Content replaces in-place |
| Command chips for discovery | File tree sidebar for discovery |
| Boot → whoami → help | Boot → show panels with soul.md selected |
| `max-w-terminal` (768px) | Full viewport width |
| All output in one stream | Sidebar + content separated |

## What Stays the Same

- Tokyo Night color scheme
- JetBrains Mono + Noto Sans TC fonts
- Window chrome (dots + title bar)
- Command input at bottom
- All command outputs (reuse from commands.tsx)
- Boot sequence (loading modules style)
- `sudo hire-panda` easter egg
- SEO hidden HTML
- Accessibility (aria labels, roles)

## Implementation Order

1. `PanelBorder.tsx` — reusable panel wrapper
2. `PanelSidebar.tsx` — file tree with keyboard nav
3. `PanelContent.tsx` — content display area
4. `PanelInfo.tsx` — bottom info bar
5. `Terminal.tsx` rewrite — panel layout manager + focus state
6. `TerminalWindow.tsx` update — full width
7. Mobile responsive — tab-based layout
8. Visual QA with Playwright

## Open Questions

- Should the command input be always visible, or only when Command panel is focused?
- Should typing a command (e.g. `cat experience.json`) also update the sidebar selection?
- Should there be a `help` panel or is the sidebar enough for discovery?
- Panel resize on hover/focus (lazygit does this) — worth implementing?
