# v2 Lego Design System

> v2.0 Global Component Library — Figma → Tokens → Code → Storybook

## Structure

```
v2-lego-design-system/
├── packages/
│   ├── tokens/          # Design tokens (CSS vars + RN JS) via Style Dictionary
│   ├── ui/              # React web components
│   └── ui-native/       # React Native components
├── apps/
│   └── storybook/       # Storybook v8 — live preview of all components
├── registry.json        # Component manifest: Figma links + code paths + status
├── CLAUDE.md            # Context for Claude / Claude Code (read before making changes)
└── .github/workflows/   # Auto-deploys Storybook to GitHub Pages on merge to main
```

## Getting Started

```bash
npm install
npm run tokens:build   # Build design tokens first
npm run storybook      # Start Storybook at localhost:6006
```

## Figma Source

All components are sourced from the [CARS24 v2.0 Global Component Library](https://www.figma.com/design/AZgWt0KHVuVeWBAcQ6Jcy4/branch/yxI5H0FhaUg0YR0uhNuqR6) in Figma.

See `registry.json` for the full component inventory with Figma links.

## Adding a Component

See `CLAUDE.md` for the full workflow.
