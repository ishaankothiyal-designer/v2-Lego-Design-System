# v2 Lego Design System — Claude Context

This file is the primary context document for Claude and Claude Code when working on this repository.
Read this before making any changes.

---

## Project Overview

**Monorepo** for the v2 Lego Design System.
- `@lego/tokens` — Design tokens sourced from Figma via Style Dictionary
- `@lego/ui` — React web components
- `@lego/ui-native` — React Native components
- `@lego/storybook` — Storybook v8 (source of truth for previewing components)

---

## Figma Source of Truth

| Key | Value |
|---|---|
| File Key | `AZgWt0KHVuVeWBAcQ6Jcy4` |
| Branch Key | `yxI5H0FhaUg0YR0uhNuqR6` |
| File URL | https://www.figma.com/design/AZgWt0KHVuVeWBAcQ6Jcy4/branch/yxI5H0FhaUg0YR0uhNuqR6 |

**All component Figma links are in `registry.json`** at the root of this repo.
Always check `registry.json` before scaffolding a component — it contains the exact Figma node URL.

---

## Component Workflow (How to Add a New Component)

1. Designer shares the Figma node URL for the component
2. Claude reads design context via Figma MCP (`get_design_context`)
3. Claude plans the component: props interface, variants, token mappings, a11y notes
4. Claude Code scaffolds all files (see File Structure below)
5. Update `registry.json` — change status from `planned` → `in-progress` → `stable`
6. Open PR → Storybook auto-builds → designer reviews
7. Merge to `main` → Storybook deploys to GitHub Pages

---

## File Structure Per Component

Every component in `packages/ui/src/components/<ComponentName>/` must have:

```
ComponentName/
├── ComponentName.tsx         # Component implementation
├── ComponentName.styles.ts   # Styles using @lego/tokens CSS variables
├── ComponentName.types.ts    # Props interface (exported)
├── ComponentName.test.tsx    # Unit tests
├── ComponentName.stories.tsx # Storybook stories (all variants)
└── index.ts                  # Barrel export
```

---

## Component Template

When scaffolding a new component, use this pattern:

```tsx
/**
 * <ComponentName> component
 *
 * @figma <FIGMA_URL_FROM_REGISTRY>
 * @tokens <list key tokens used>
 * @status planned | in-progress | stable
 */

import React from 'react';
import type { <ComponentName>Props } from './<ComponentName>.types';
import styles from './<ComponentName>.styles';

export const <ComponentName> = ({ ...props }: <ComponentName>Props) => {
  return <div {...props} />;
};

<ComponentName>.displayName = '<ComponentName>';
export default <ComponentName>;
```

---

## Storybook Story Template

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { <ComponentName> } from './<ComponentName>';

const meta: Meta<typeof <ComponentName>> = {
  title: 'Components/<ComponentName>',
  component: <ComponentName>,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: '<FIGMA_URL_FROM_REGISTRY>',
    },
  },
};

export default meta;
type Story = StoryObj<typeof <ComponentName>>;

export const Default: Story = {
  args: {},
};
```

---

## Token Usage

Always use CSS variables from `@lego/tokens` — never hardcode values.

| Token | CSS Variable | Usage |
|---|---|---|
| Primary color | `var(--lego-color-primary-500)` | CTAs, links |
| Neutral text | `var(--lego-color-neutral-900)` | Body text |
| Spacing sm | `var(--lego-spacing-2)` | `8px` padding |
| Spacing md | `var(--lego-spacing-4)` | `16px` padding |
| Border radius | `var(--lego-borderRadius-md)` | `8px` cards |
| Font size md | `var(--lego-fontSize-md)` | `15px` body |
| Font size xs | `var(--lego-fontSize-xs)` | `11px` captions |

---

## Platforms

- **Web**: `packages/ui` — standard React + CSS variables
- **Native**: `packages/ui-native` — React Native with token JS object from `@lego/tokens/native`
- Tokens are the shared layer — component implementations are platform-specific

---

## Registry

`registry.json` at the root maps every component to:
- Figma page node ID + URL
- Code file path
- Story file path
- Status: `planned` | `in-progress` | `stable`
- Supported platforms

**Always update `registry.json` when a component status changes.**

---

## PR Checklist

Before merging any component PR:
- [ ] All Figma variants covered in Storybook stories
- [ ] Only `@lego/tokens` CSS variables used (no hardcoded values)
- [ ] `@storybook/addon-a11y` checks pass
- [ ] `registry.json` status updated
- [ ] JSDoc `@figma` annotation present in component file
- [ ] React Native parity checked (if `platforms` includes `native`)
