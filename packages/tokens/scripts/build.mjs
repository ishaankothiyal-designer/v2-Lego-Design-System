#!/usr/bin/env node
/**
 * @lego/tokens — build.mjs
 *
 * Transforms the Figma variables export (Tokens/token.json) into:
 *   dist/tokens.css        CSS custom properties for web
 *   dist/index.mjs         ESM named exports
 *   dist/index.js          CJS named exports
 *   dist/index.d.ts        TypeScript declarations
 *   dist/tokens.native.js  Per-brand resolved token object for React Native
 *
 * Brand switching (web):
 *   Set data-brand="cars24|teambhp|carinfo|vehicleinfo" on <html>.
 *   Cars24 is the default (no attribute required).
 *
 * Usage: node scripts/build.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const PKG  = join(__dir, '..')                                          // packages/tokens/
const SRC  = join(PKG, '..', '..', '..', 'Tokens', 'token-bible.json') // Tokens/token-bible.json
const DIST = join(PKG, 'dist')

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert a Figma RGBA float object to a CSS color string. */
function toColor({ r, g, b, a = 1 }) {
  const byte = (v) => Math.round(v * 255)
  if (byte(a) < 255) return `rgba(${byte(r)}, ${byte(g)}, ${byte(b)}, ${+a.toFixed(3)})`
  return '#' + [r, g, b].map((v) => byte(v).toString(16).padStart(2, '0')).join('')
}

/** Normalise a Figma variable name to a CSS-safe kebab string. */
function kebab(str) {
  return str
    .replace(/\(B\)/gi, '')       // strip "(B)" base-colour marker
    .replace(/[/\\]/g, '-')       // slashes → dash
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/gi, '')  // remove remaining non-alphanum
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

// ── Load ──────────────────────────────────────────────────────────────────────

const data = JSON.parse(readFileSync(SRC, 'utf8'))

// Index every variable by ID across all collections
const varById     = {}  // id → variable object
const colByVarId  = {}  // id → collection name
for (const col of data.collections) {
  for (const v of col.variables) {
    varById[v.id]    = v
    colByVarId[v.id] = col.name
  }
}

const getCol      = (name) => data.collections.find((c) => c.name === name)
const firstMode   = (col)  => col.modes[0].modeId

// ── CSS variable naming ────────────────────────────────────────────────────────

/** Return the --lego-* suffix for a variable (without the --lego- prefix). */
function varSuffix(variable) {
  const col = colByVarId[variable.id]
  const k   = kebab(variable.name)
  switch (col) {
    case 'Primitive': return `primitive-${k}`
    case 'Utility':   return `utility-${k}`
    case 'Misc':
    case 'Semantic':
    case 'Theme':
      return k
    case 'Typography':
      if (k.startsWith('size-')) return k.replace('size-', 'font-size-')
      return k                    // line-height-*, letter-spacing-* pass through
    default:
      return k
  }
}

const ref  = (suffix) => `var(--lego-${suffix})`
const prop = (suffix, val) => `  --lego-${suffix}: ${val};`

// ── Value resolution ──────────────────────────────────────────────────────────

/**
 * Return the CSS value for a variable in a given mode.
 * Aliases become CSS var() references; literal values are returned as-is.
 */
function cssVal(variable, modeId) {
  const raw = variable.valuesByMode[modeId] ?? Object.values(variable.valuesByMode)[0]
  if (raw == null) return null

  if (raw?.type === 'VARIABLE_ALIAS') {
    const target = varById[raw.id]
    if (!target) return null
    return ref(varSuffix(target))
  }

  if (variable.resolvedType === 'COLOR') return toColor(raw)
  return raw  // FLOAT, STRING, BOOLEAN returned as-is
}

/**
 * Fully resolve a variable to its leaf value (for JS/Native output).
 * Follows VARIABLE_ALIAS chains until a concrete value is found.
 */
function resolveDeep(varId, modeId, depth = 0) {
  if (depth > 15) return null
  const v = varById[varId]
  if (!v) return null
  const raw = v.valuesByMode[modeId] ?? Object.values(v.valuesByMode)[0]
  if (raw?.type === 'VARIABLE_ALIAS') {
    const target = varById[raw.id]
    if (!target) return null
    return resolveDeep(raw.id, Object.keys(target.valuesByMode)[0], depth + 1)
  }
  return raw
}

// ── Collections ───────────────────────────────────────────────────────────────

const primitive  = getCol('Primitive')
const utility    = getCol('Utility')
const misc       = getCol('Misc')
const typography = getCol('Typography')
const theme      = getCol('Theme')
const semantic   = getCol('Semantic')

const primMode = firstMode(primitive)
const utilMode = firstMode(utility)
const miscMode = firstMode(misc)
const semMode  = firstMode(semantic)

// Brand mode map
const BRAND_KEY = {
  'Cars24':       'cars24',
  'Team BHP':     'teambhp',
  'CarInfo':      'carinfo',
  'Vehicle Info': 'vehicleinfo',
}
const defaultModeId = theme.modes.find((m) => m.name === 'Cars24').modeId

// Typography viewport modes
const typoMode = (name) => typography.modes.find((m) => m.name === name).modeId
const moMode   = typoMode('Mobile')
const taMode   = typoMode('Tablet')
const deMode   = typoMode('Desktop')

// ── CSS ───────────────────────────────────────────────────────────────────────

const css = []
const section = (title) =>
  css.push('', `/* ── ${title} ${'─'.repeat(Math.max(0, 54 - title.length))} */`)

css.push(
  '/**',
  ' * @lego/tokens — tokens.css',
  ' * Generated from Figma. Do not edit manually.',
  ` * Built: ${new Date().toISOString()}`,
  ' */',
)

// 1 ─ Primitives ───────────────────────────────────────────────────────────────
section('PRIMITIVES')
css.push(':root {')
for (const v of primitive.variables) {
  const val = cssVal(v, primMode)
  if (val != null) css.push(prop(varSuffix(v), val))
}
css.push('}')

// 2 ─ Utility (alpha colours) ──────────────────────────────────────────────────
section('UTILITY — alpha colours')
css.push(':root {')
for (const v of utility.variables) {
  const val = cssVal(v, utilMode)
  if (val != null) css.push(prop(varSuffix(v), val))
}
css.push('}')

// 3 ─ Misc (gap · stroke · opacity · size) ─────────────────────────────────────
section('MISC — gap · stroke · opacity · size')
css.push(':root {')
for (const v of misc.variables) {
  const raw = cssVal(v, miscMode)
  if (raw == null) continue
  const name = varSuffix(v)
  let val
  if (typeof raw === 'number') {
    // Opacity stored as 0–100; output as 0–1 decimal for CSS
    if (name.startsWith('opacity-')) val = +(raw / 100).toFixed(4)
    else val = raw === 0 ? '0px' : `${raw}px`
  } else {
    val = raw
  }
  css.push(prop(name, val))
}
css.push('}')

// 4 ─ Typography (responsive, mobile-first) ────────────────────────────────────
section('TYPOGRAPHY — mobile-first responsive')
const typoVal = (v, mId) => {
  const raw = cssVal(v, mId)
  if (raw == null) return null
  return typeof raw === 'number' ? `${raw}px` : raw
}

// Mobile default in :root
css.push(':root {')
for (const v of typography.variables) {
  const val = typoVal(v, moMode)
  if (val != null) css.push(prop(varSuffix(v), val))
}
css.push('}')

// Tablet overrides
css.push('\n@media (min-width: 768px) {', '  :root {')
for (const v of typography.variables) {
  const mo = typoVal(v, moMode)
  const ta = typoVal(v, taMode)
  if (ta != null && ta !== mo) css.push(`    --lego-${varSuffix(v)}: ${ta};`)
}
css.push('  }', '}')

// Desktop overrides
css.push('\n@media (min-width: 1280px) {', '  :root {')
for (const v of typography.variables) {
  const ta = typoVal(v, taMode)
  const de = typoVal(v, deMode)
  if (de != null && de !== ta) css.push(`    --lego-${varSuffix(v)}: ${de};`)
}
css.push('  }', '}')

// 5 ─ Brand themes ─────────────────────────────────────────────────────────────
section('BRAND THEMES')
css.push(
  '/*',
  ' * Set data-brand on <html> to activate a brand.',
  ' * Values: "cars24" | "teambhp" | "carinfo" | "vehicleinfo"',
  ' * Default (no attribute set): cars24',
  ' */',
)

function emitThemeBlock(modeId, selector, comment) {
  const lines = []
  if (comment) lines.push(`\n/* ${comment} */`)
  lines.push(`${selector} {`)
  for (const v of theme.variables) {
    const raw = cssVal(v, modeId)
    if (raw == null) continue
    let val = raw
    if (typeof raw === 'number') {
      const k = kebab(v.name)
      // font-weight and boolean-like alignment values are unitless
      val = (k.includes('weight') || k.includes('align')) ? raw : `${raw}px`
    }
    lines.push(prop(varSuffix(v), val))
  }
  lines.push('}')
  return lines
}

// `:root` carries the Cars24 defaults (no attribute needed)
css.push(...emitThemeBlock(defaultModeId, ':root', 'Default brand: Cars24'))

// Explicit [data-brand] blocks for all four brands
for (const mode of theme.modes) {
  const brand = BRAND_KEY[mode.name] ?? kebab(mode.name)
  css.push(...emitThemeBlock(mode.modeId, `[data-brand="${brand}"]`, mode.name))
}

// 6 ─ Semantic ─────────────────────────────────────────────────────────────────
section('SEMANTIC — intent-based roles')
css.push(':root {')
for (const v of semantic.variables) {
  const val = cssVal(v, semMode)
  if (val != null) css.push(prop(varSuffix(v), val))
}
css.push('}')

// ── Write CSS ─────────────────────────────────────────────────────────────────
if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true })
writeFileSync(join(DIST, 'tokens.css'), css.join('\n'))
console.log('✓  dist/tokens.css')

// ── JS object helpers ─────────────────────────────────────────────────────────

/** Deeply set a dot-path in an object. */
function setPath(obj, pathArr, value) {
  let cur = obj
  for (let i = 0; i < pathArr.length - 1; i++) {
    const k = pathArr[i]
    if (!cur[k]) cur[k] = {}
    cur = cur[k]
  }
  cur[pathArr[pathArr.length - 1]] = value
}

/** Convert a collection's variables to a nested JS object (fully resolved). */
function colToObj(col, modeId) {
  const result = {}
  for (const v of col.variables) {
    const raw = resolveDeep(v.id, modeId)
    if (raw == null) continue
    const path  = v.name.split('/').map(kebab)
    const value = v.resolvedType === 'COLOR' ? toColor(raw) : raw
    setPath(result, path, value)
  }
  return result
}

/** Build a per-brand theme object (fully resolved). */
function buildThemeObj() {
  const result = {}
  for (const mode of theme.modes) {
    const brand = BRAND_KEY[mode.name] ?? kebab(mode.name)
    result[brand] = colToObj(theme, mode.modeId)
  }
  return result
}

const jsTokens = {
  primitives: colToObj(primitive, primMode),
  utility:    colToObj(utility,   utilMode),
  misc:       colToObj(misc,      miscMode),
  theme:      buildThemeObj(),
}
const serialised = JSON.stringify(jsTokens, null, 2)

// ESM
writeFileSync(join(DIST, 'index.mjs'), [
  '// @lego/tokens — Generated from Figma. Do not edit.',
  `const tokens = ${serialised}`,
  'export const { primitives, utility, misc, theme } = tokens',
  'export default tokens',
  '',
].join('\n'))
console.log('✓  dist/index.mjs')

// CJS
writeFileSync(join(DIST, 'index.js'), [
  '// @lego/tokens — Generated from Figma. Do not edit.',
  `const tokens = ${serialised}`,
  'module.exports = tokens',
  '',
].join('\n'))
console.log('✓  dist/index.js')

// TypeScript declarations
writeFileSync(join(DIST, 'index.d.ts'), `\
// @lego/tokens — Generated from Figma. Do not edit.
export interface BrandTheme {
  brand:      Record<string, string | Record<string, string>>
  font:       { family: Record<string, string>; weight: Record<string, number> }
  radius:     Record<string, number | string>
  'component-behaviour'?: Record<string, any>
}
export declare const primitives: Record<string, Record<string, string>>
export declare const utility:    Record<string, Record<string, string>>
export declare const misc:       { gap: Record<string, number>; stroke: Record<string, number>; opacity: Record<string, number>; size: Record<string, number> }
export declare const theme: {
  cars24:      BrandTheme
  teambhp:     BrandTheme
  carinfo:     BrandTheme
  vehicleinfo: BrandTheme
}
declare const tokens: { primitives: typeof primitives; utility: typeof utility; misc: typeof misc; theme: typeof theme }
export default tokens
`)
console.log('✓  dist/index.d.ts')

// React Native — per-brand theme + shared typography/misc
function buildNativeTokens() {
  const result = {}
  for (const mode of theme.modes) {
    const brand = BRAND_KEY[mode.name] ?? kebab(mode.name)
    result[brand] = colToObj(theme, mode.modeId)
  }
  result._misc       = jsTokens.misc
  result._typography = {
    mobile:  colToObj(typography, moMode),
    tablet:  colToObj(typography, taMode),
    desktop: colToObj(typography, deMode),
  }
  return result
}

writeFileSync(join(DIST, 'tokens.native.js'), [
  '// @lego/tokens — Generated from Figma. Do not edit.',
  `const tokens = ${JSON.stringify(buildNativeTokens(), null, 2)}`,
  'module.exports = tokens',
  '',
].join('\n'))
console.log('✓  dist/tokens.native.js')

console.log('\n✓  @lego/tokens build complete')
