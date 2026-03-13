# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production (static export)
npm run lint     # Run ESLint
```

No test runner is configured.

## Architecture

Single-page Next.js 15 PWA with static export (`output: 'export'` in `next.config.ts`). The app has one purpose: pick a random Spotify genre and redirect to it.

**Component structure:**
- `app/layout.tsx` — server-rendered root with PWA metadata
- `app/page.tsx` — renders `<GenrePicker />` centered in viewport
- `components/genre-picker.tsx` — all logic lives here (267 lines, client component): 71 hardcoded Spotify genres, local React state only, genre reveal animation, settings panel
- `components/pwa-register.tsx` — registers service worker on mount, no visual output

**Key details:**
- Static export means no server-side features (no API routes, no dynamic routes)
- Base path configurable via `PAGES_BASE_PATH` env var
- Genre reveal is a CSS keyframe animation (~1500ms) before Spotify redirect
- iOS PWA requires `window.location.href` instead of `window.open` for Spotify redirect
- Custom Tailwind colors defined as CSS variables in `globals.css`: `--color-ava-snow`, `--color-ava-ice`, `--color-ava-night`, `--color-ava-steel`
- Path alias `@/*` maps to repo root
