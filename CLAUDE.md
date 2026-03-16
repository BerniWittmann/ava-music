# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Build for production (static export to ./out)
npm run lint     # Run ESLint
npm run start    # Start production server (not useful with static export)
```

No test runner is configured.

## Architecture

Single-page Next.js 15 PWA with static export (`output: 'export'` in `next.config.ts`). The app has one purpose: pick a random Spotify genre and redirect to it.

### Directory Structure

```
app/
  layout.tsx          — server-rendered root with PWA metadata
  page.tsx            — renders <GenrePicker /> centered in viewport
  globals.css         — global styles, CSS variables, keyframe animations
  icon.png            — app icon (used by Next.js metadata)
  apple-icon.png      — iOS home screen icon
components/
  genre-picker.tsx    — all app logic (271 lines, client component)
  pwa-register.tsx    — registers service worker on mount, no visual output
public/
  manifest.json       — PWA manifest (standalone display, dark theme)
  sw.js               — service worker (cache-first strategy)
  ava-logo.png        — Avalanches logo displayed in UI
  bg-texture.jpg      — background texture image
  icons/              — PWA icons (192px and 512px)
.github/workflows/
  deploy.yml          — GitHub Pages deployment workflow
```

### Component Details

**`components/genre-picker.tsx`** (client component — all logic lives here)
- 71 hardcoded Spotify genres, each with a unique Spotify ID, display name, and `defaultSelected` flag
- 13 genres selected by default: Alternative, Country, Dance/Electronic, Fitness, Hip-Hop, Indie, Metal, Party, Pop, Rock, Schlager, Skate Noise
- State: `lastGenre`, `revealedGenre`, `isSettingsOpen`, `selectedGenreIds` (all local React state, no persistence)
- `onPick()`: picks random genre → triggers 1500ms CSS reveal animation → redirects to Spotify
- Settings panel (gear icon, bottom-right): select/deselect individual genres, select all / deselect all
- CTA button is disabled when zero genres are selected

**`components/pwa-register.tsx`** — registers `./sw.js` on mount, returns null

**`app/layout.tsx`** — configures PWA metadata: manifest, Apple Web App capable, theme color `#0a0a0f`

### Key Details

- Static export: no server-side features (no API routes, no dynamic routes, no SSR)
- Base path configurable via `PAGES_BASE_PATH` env var (for GitHub Pages subdirectory deployment)
- Genre reveal is three coordinated CSS keyframe animations (~1500ms total): overlay fade, text zoom+blur, label slide-up
- iOS redirect: uses `window.open(url, '_blank', 'noopener,noreferrer')`; falls back to `window.location.href` if popup is blocked (iOS detection via `/iPad|iPhone|iPod/.test(navigator.userAgent)`)
- Path alias `@/*` maps to repo root

## Styling

**CSS variables** defined in `globals.css` (used inline as `var(--ava-*)` or in Tailwind arbitrary values):

| Variable | Value | Usage |
|---|---|---|
| `--ava-snow` | `#f6fbff` | Light text, headings |
| `--ava-ice` | `#76a8d3` | Medium blue accents |
| `--ava-ice-bright` | `#9bc3e5` | Bright blue hover states |
| `--ava-night` | `#0a1320` | Dark background |
| `--ava-steel` | `#1a2635` | Slightly lighter dark surfaces |

**Background**: HTML element has dark navy base + linear gradient overlay + `bg-texture.jpg`. Body has radial gradients at top-left and bottom-right for depth.

**Tailwind**: utility classes throughout; responsive prefix `sm:` for desktop variants; `focus-visible:` for keyboard accessibility.

## PWA / Service Worker

- Cache name: `ava-genre-picker-v1`
- Cache-first strategy: serves from cache, falls back to network, caches new GET responses
- Pre-cached on install: `./`, `./ava-logo.png`, `./bg-texture.jpg`
- Old caches purged on activate

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages. `PAGES_BASE_PATH` must be set to the repository subdirectory path (e.g., `/ava-music`) when deploying to a non-root GitHub Pages URL.

## Dependencies

- `next` ^15, `react` ^18, `react-dom` ^18
- `tailwindcss` ^3, `typescript` ^5
- No additional runtime dependencies
