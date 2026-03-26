# Panda Tseng - TUI CV

Interactive terminal-style CV website with lazygit-inspired multi-panel layout. Built with Next.js, Tokyo Night theme.

**Live:** [pdzeng.com](https://pdzeng.com)

## Features

- **Multi-panel layout** — lazygit-style: file tree sidebar + content panel + info bar
- **Keyboard navigation** — Tab switches panels, 1-7 jumps to files, arrow keys navigate
- **Boot sequence** — terminal loading animation on first visit
- **Command input** — type shell commands (`cat soul.md`, `ls projects/`, etc.)
- **Mobile responsive** — tab-based Files/Content switcher
- **SEO** — hidden semantic HTML for crawlers alongside the interactive terminal

## Tech Stack

- **Next.js 15** (App Router, static export)
- **TypeScript** + **Tailwind CSS**
- **Framer Motion** (animations)
- **Tokyo Night** color scheme
- **JetBrains Mono** + **Noto Sans TC** fonts
- **Vercel** (auto-deploy on push to main)

## Quick Start

```bash
npm install
npm run dev        # localhost:3000
npm run build      # production build
```

## Content

All CV data lives in `src/data/content.ts`. Edit that file to update personal info, experiences, projects, achievements, education, skills, and social links.

## Architecture

```
page.tsx → TerminalWindow (chrome) → Terminal (state manager)
                                       ├── PanelSidebar (file tree)
                                       ├── PanelContent (command output)
                                       ├── PanelInfo (name/title/links)
                                       └── CommandInput (shell input)

commands.tsx: command string → React component (JSX output)
content.ts:  centralized CV data source
```

## Deploy

Push to `main` → Vercel auto-deploys to production.

## License

© 2025 Panda Tseng. All rights reserved.
