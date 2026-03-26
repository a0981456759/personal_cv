---
date: 2026-03-26
branch: main
project: personal-cv
tags: [coding-session, personal-cv, tui, redesign]
chain_path: [brainstorming, writing-plans, subagent-driven-development, done]
chain_grade: B
---

# TUI CV Redesign — 2026-03-26

## What happened

Redesigned pdzeng.com from a white minimal single-page CV into an interactive TUI (Terminal User Interface) terminal. Started with product-lead and design-lead agents brainstorming the direction — consensus was "pure terminal, not VS Code clone", inspired by Claude Code CLI. Phase 1 built a scrolling terminal page with Tokyo Night theme, but user feedback said it felt like "just a dark-themed website" — not truly interactive. Phase 2 reworked it into a real interactive terminal where visitors type commands (`cat soul.md`, `ls projects/`, `cat skills.md`, etc.) to explore content. Phase 3 design doc was written for a lazygit-style multi-panel architecture (left sidebar + main content + info bar) — to be implemented next session.

## Retrospective

- User's vision evolved during the session: started with "like danielavila.me", shifted to "like Claude Code", then to "like lazygit" — each iteration was more specific and more authentic to TUI culture
- The scrolling page approach (Phase 1) was a mistake — it looked terminal-themed but didn't feel interactive. The real value is in the interaction model, not the visual theme
- Three-lead collaboration (product/design/eng) produced high-quality feedback but was overkill for the iteration speed needed — user wanted faster changes, not more analysis
- ASCII art is harder than expected on web — font rendering differences across OS/browser make block characters unreliable. Figlet text logo was the right call

## Current state

Interactive terminal CV is functional with 15 commits on main:
- Boot sequence (loading modules style)
- 10 commands: whoami, cat soul.md, cat experience.json, ls projects/, cat achievements.md, cat contact.json, cat education.md, cat skills.md, help, clear + easter egg (sudo hire-panda)
- Clickable commands in help + command chips
- SEO hidden HTML for crawlers
- Accessibility (aria labels, role="log")
- Projects updated from GitHub profile (Murmur Voice, Slack CLI, Notion CLI, Skill Evolution, WalkinCat, Portfolio Tracker)
- Skills two-column layout, no scores
- Phase 3 design doc written (`docs/phase3-lazygit-panels.md`)

## Follow-ups

- [ ] Phase 3: Implement lazygit-style panel architecture (sidebar + content + info bar)
- [ ] Deploy to production (Cloudflare Pages or Vercel)
- [ ] Mobile responsive for panel layout (tab-based switching)
- [ ] Skills data: consider linking to actual skill repos
- [ ] Tab cycle completion (currently only matches first command)
- [ ] iOS Safari sticky bottom + safe area testing
