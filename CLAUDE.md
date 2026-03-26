# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build (also serves as type check)
npm run lint         # ESLint
```

No test framework is configured. Verify changes with `npm run build` and visual QA via Playwright MCP.

## Architecture

This is a **TUI (Terminal User Interface) personal CV website** — not a traditional portfolio page. It emulates a terminal with lazygit-style multi-panel layout.

### Data Flow

```
content.ts → commands.tsx → Terminal.tsx → Panel components → TerminalWindow.tsx
(all CV data)  (cmd→JSX)    (state mgr)   (UI panels)       (window chrome)
```

### Key Concept: Commands Return JSX

Commands are not strings — each command maps to a React component via factory functions in `commands.tsx`. The `executeCommand()` function returns `{ command: string, output: ReactNode }`. Adding a new section means: add data to `content.ts`, create an output component in `commands.tsx`, add the command mapping to `outputMap`.

### Panel System (Phase 3)

`Terminal.tsx` manages a multi-panel layout inspired by lazygit:

- **PanelSidebar** — File tree (7 entries), arrow key navigation, click to select
- **PanelContent** — Renders the output of the selected file's command
- **PanelInfo** — Static bottom bar (name, title, location, social links)
- **PanelBorder** — Reusable wrapper with focus-highlighted borders (fieldset-legend style title)
- **CommandInput** — Shell-style input with history (arrow keys) and tab autocomplete

Focus state (`"sidebar" | "content" | "command"`) controls which panel is active. Tab cycles focus, number keys 1-7 jump to files.

### Boot Sequence

Defined in `ascii.ts` as `BOOT_LINES` — staggered text lines (0–850ms). After boot, panels appear with `soul.md` auto-selected. Boot renders centered, then transitions to panel layout via `phase` state.

### Mobile

Panels stack vertically with a `Files | Content` tab switcher. Clicking a file auto-switches to Content tab. Command input always at bottom.

### SEO

`page.tsx` renders a hidden `<article>` with semantic HTML for crawlers — all content from `content.ts` is duplicated there. The visible UI is the terminal; the hidden HTML is for search engines.

## Design System

**Theme:** Tokyo Night (`tailwind.config.ts`)

| Token | Color | Usage |
|-------|-------|-------|
| `terminal-bg` | #1a1b26 | Main background |
| `terminal-bg-alt` | #24283b | Header, input areas |
| `terminal-border` | #3b4261 | Panel borders, dividers |
| `accent-green` | #9ece6a | Prompt `$`, positive |
| `accent-cyan` | #7dcfff | Commands, links, focused borders |
| `accent-purple` | #bb9af7 | Section headers |
| `accent-yellow` | #e0af68 | Tags, labels |
| `accent-orange` | #ff9e64 | Dates |
| `accent-red` | #f7768e | Errors |

**Font:** JetBrains Mono + Noto Sans TC (Chinese fallback), 14px base.

**Utility classes** in `globals.css`: `.terminal-link`, `.terminal-tag`, `.terminal-prompt`, `.cursor-blink`.

## Content

All CV data lives in `src/data/content.ts`. Exports: `personalInfo`, `about`, `experiences`, `projects`, `achievements`, `education`, `skills`, `socialLinks`. Content is in Traditional Chinese.

## Design Direction

This is meant to feel like **actually using a terminal tool** (lazygit, htop), not a dark-themed webpage. Panels are fixed layout, content replaces in-place (no scrolling history). The interaction IS the design.
