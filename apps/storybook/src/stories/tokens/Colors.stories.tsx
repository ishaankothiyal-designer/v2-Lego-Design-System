import type { Meta, StoryObj } from '@storybook/react'
import React, { useEffect, useRef, useState } from 'react'

// ── Helpers ──────────────────────────────────────────────────────────────────

function useCSSVar(name: string): string {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState('')
  useEffect(() => {
    if (!ref.current) return
    setValue(getComputedStyle(ref.current).getPropertyValue(name).trim())
  }, [name])
  return value
}

// Reads a list of CSS var names from the current :root / data-brand element
function useTokenMap(vars: string[]): Record<string, string> {
  const [map, setMap] = useState<Record<string, string>>({})
  useEffect(() => {
    const root = document.documentElement
    const computed = getComputedStyle(root)
    const result: Record<string, string> = {}
    for (const v of vars) {
      result[v] = computed.getPropertyValue(v).trim()
    }
    setMap(result)
  }, [vars.join(',')])
  return map
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface SwatchProps {
  cssVar: string
  label?: string
}

function Swatch({ cssVar, label }: SwatchProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hex, setHex] = useState('')
  useEffect(() => {
    if (!ref.current) return
    setHex(getComputedStyle(ref.current).backgroundColor)
  }, [cssVar])

  const displayLabel = label ?? cssVar.replace('--lego-', '')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 100 }}>
      <div
        ref={ref}
        style={{
          backgroundColor: `var(${cssVar})`,
          width: '100%',
          height: 56,
          borderRadius: 8,
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      />
      <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#374151', lineHeight: 1.4 }}>
        <div style={{ fontWeight: 600 }}>{displayLabel}</div>
        <div style={{ color: '#9CA3AF' }}>{cssVar}</div>
      </div>
    </div>
  )
}

interface GroupProps {
  title: string
  vars: string[]
  columns?: number
}

function SwatchGroup({ title, vars, columns = 6 }: GroupProps) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h3 style={{
        fontSize: 13,
        fontWeight: 600,
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: 16,
        borderBottom: '1px solid #E5E7EB',
        paddingBottom: 8,
      }}>
        {title}
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 12,
      }}>
        {vars.map((v) => <Swatch key={v} cssVar={v} />)}
      </div>
    </section>
  )
}

// ── Primitive Palette ─────────────────────────────────────────────────────────

const PRIMITIVE_GROUPS: Record<string, string[]> = {
  'Neutral': [
    '--lego-primitive-neutral-50',
    '--lego-primitive-neutral-100',
    '--lego-primitive-neutral-200',
    '--lego-primitive-neutral-300',
    '--lego-primitive-neutral-400',
    '--lego-primitive-neutral-500',
    '--lego-primitive-neutral-600',
    '--lego-primitive-neutral-700',
    '--lego-primitive-neutral-800',
    '--lego-primitive-neutral-900',
    '--lego-primitive-neutral-950',
  ],
  'Slate': [
    '--lego-primitive-slate-50',
    '--lego-primitive-slate-100',
    '--lego-primitive-slate-200',
    '--lego-primitive-slate-300',
    '--lego-primitive-slate-400',
    '--lego-primitive-slate-500',
    '--lego-primitive-slate-600',
    '--lego-primitive-slate-700',
    '--lego-primitive-slate-800',
    '--lego-primitive-slate-900',
    '--lego-primitive-slate-950',
  ],
  'Cobalt Blue': [
    '--lego-primitive-cobalt-blue-50',
    '--lego-primitive-cobalt-blue-100',
    '--lego-primitive-cobalt-blue-200',
    '--lego-primitive-cobalt-blue-300',
    '--lego-primitive-cobalt-blue-400',
    '--lego-primitive-cobalt-blue-500',
    '--lego-primitive-cobalt-blue-600',
    '--lego-primitive-cobalt-blue-700',
    '--lego-primitive-cobalt-blue-800',
    '--lego-primitive-cobalt-blue-900',
    '--lego-primitive-cobalt-blue-950',
  ],
  'Lotus Blue': [
    '--lego-primitive-lotus-blue-50',
    '--lego-primitive-lotus-blue-100',
    '--lego-primitive-lotus-blue-200',
    '--lego-primitive-lotus-blue-300',
    '--lego-primitive-lotus-blue-400',
    '--lego-primitive-lotus-blue-500',
    '--lego-primitive-lotus-blue-600',
    '--lego-primitive-lotus-blue-700',
    '--lego-primitive-lotus-blue-800',
    '--lego-primitive-lotus-blue-900',
    '--lego-primitive-lotus-blue-950',
  ],
  'Bright Blue': [
    '--lego-primitive-bright-blue-50',
    '--lego-primitive-bright-blue-100',
    '--lego-primitive-bright-blue-200',
    '--lego-primitive-bright-blue-300',
    '--lego-primitive-bright-blue-400',
    '--lego-primitive-bright-blue-500',
    '--lego-primitive-bright-blue-600',
    '--lego-primitive-bright-blue-700',
    '--lego-primitive-bright-blue-800',
    '--lego-primitive-bright-blue-900',
    '--lego-primitive-bright-blue-950',
  ],
  'Electric Violet': [
    '--lego-primitive-electric-violet-50',
    '--lego-primitive-electric-violet-100',
    '--lego-primitive-electric-violet-200',
    '--lego-primitive-electric-violet-300',
    '--lego-primitive-electric-violet-400',
    '--lego-primitive-electric-violet-500',
    '--lego-primitive-electric-violet-600',
    '--lego-primitive-electric-violet-700',
    '--lego-primitive-electric-violet-800',
    '--lego-primitive-electric-violet-900',
    '--lego-primitive-electric-violet-950',
  ],
  'Amber': [
    '--lego-primitive-amber-50',
    '--lego-primitive-amber-100',
    '--lego-primitive-amber-200',
    '--lego-primitive-amber-300',
    '--lego-primitive-amber-400',
    '--lego-primitive-amber-500',
    '--lego-primitive-amber-600',
    '--lego-primitive-amber-700',
    '--lego-primitive-amber-800',
    '--lego-primitive-amber-900',
    '--lego-primitive-amber-950',
  ],
  'Red': [
    '--lego-primitive-red-50',
    '--lego-primitive-red-100',
    '--lego-primitive-red-200',
    '--lego-primitive-red-300',
    '--lego-primitive-red-400',
    '--lego-primitive-red-500',
    '--lego-primitive-red-600',
    '--lego-primitive-red-700',
    '--lego-primitive-red-800',
    '--lego-primitive-red-900',
    '--lego-primitive-red-950',
  ],
  'Crimson Red': [
    '--lego-primitive-crimson-red-50',
    '--lego-primitive-crimson-red-100',
    '--lego-primitive-crimson-red-200',
    '--lego-primitive-crimson-red-300',
    '--lego-primitive-crimson-red-400',
    '--lego-primitive-crimson-red-500',
    '--lego-primitive-crimson-red-600',
    '--lego-primitive-crimson-red-700',
    '--lego-primitive-crimson-red-800',
    '--lego-primitive-crimson-red-900',
    '--lego-primitive-crimson-red-950',
  ],
  'Green': [
    '--lego-primitive-green-50',
    '--lego-primitive-green-100',
    '--lego-primitive-green-200',
    '--lego-primitive-green-300',
    '--lego-primitive-green-400',
    '--lego-primitive-green-500',
    '--lego-primitive-green-600',
    '--lego-primitive-green-700',
    '--lego-primitive-green-800',
    '--lego-primitive-green-900',
    '--lego-primitive-green-950',
  ],
  'Base': [
    '--lego-primitive-base-black',
    '--lego-primitive-base-white',
  ],
}

// ── Semantic Groups ───────────────────────────────────────────────────────────

const SEMANTIC_GROUPS: Record<string, string[]> = {
  'Background — Neutral': [
    '--lego-bg-primary',
    '--lego-bg-primary-hover',
    '--lego-bg-primary-inverse',
    '--lego-bg-secondary',
    '--lego-bg-secondary-hover',
    '--lego-bg-secondary-inverse',
    '--lego-bg-tertiary',
    '--lego-bg-quaternary',
    '--lego-bg-disabled-subtle',
    '--lego-bg-disabled',
  ],
  'Background — Brand': [
    '--lego-bg-brand-subtler',
    '--lego-bg-brand-subtle',
    '--lego-bg-brand-base',
    '--lego-bg-brand-bold',
    '--lego-bg-brand-subtler-alt',
    '--lego-bg-brand-subtle-alt',
    '--lego-bg-brand-base-alt',
    '--lego-bg-brand-bold-alt',
  ],
  'Background — Status': [
    '--lego-bg-danger-subtler',
    '--lego-bg-danger-subtle',
    '--lego-bg-danger-base',
    '--lego-bg-danger-bold',
    '--lego-bg-success-subtler',
    '--lego-bg-success-subtle',
    '--lego-bg-success-base',
    '--lego-bg-success-bold',
    '--lego-bg-info-subtler',
    '--lego-bg-info-subtle',
    '--lego-bg-info-base',
    '--lego-bg-info-bold',
    '--lego-bg-warning-subtler',
    '--lego-bg-warning-subtle',
    '--lego-bg-warning-base',
    '--lego-bg-warning-bold',
  ],
  'Text': [
    '--lego-text-primary',
    '--lego-text-secondary',
    '--lego-text-tertiary',
    '--lego-text-disabled',
    '--lego-text-inverse',
    '--lego-text-brand',
    '--lego-text-danger',
    '--lego-text-success',
    '--lego-text-warning',
    '--lego-text-info',
  ],
  'Icon': [
    '--lego-icon-primary',
    '--lego-icon-primary-inverse',
    '--lego-icon-secondary',
    '--lego-icon-brand',
    '--lego-icon-danger',
    '--lego-icon-success',
    '--lego-icon-warning',
    '--lego-icon-info',
  ],
}

// ── Brand Theme Tokens ────────────────────────────────────────────────────────

const BRAND_VARS = [
  '--lego-brand-50', '--lego-brand-100', '--lego-brand-200', '--lego-brand-300',
  '--lego-brand-400', '--lego-brand-500', '--lego-brand-600', '--lego-brand-700',
  '--lego-brand-800', '--lego-brand-900', '--lego-brand-950',
  '--lego-brand-alt-50', '--lego-brand-alt-100', '--lego-brand-alt-200', '--lego-brand-alt-300',
  '--lego-brand-alt-400', '--lego-brand-alt-500', '--lego-brand-alt-600', '--lego-brand-alt-700',
  '--lego-brand-alt-800', '--lego-brand-alt-900', '--lego-brand-alt-950',
]

const BRANDS = ['cars24', 'teambhp', 'carinfo', 'vehicleinfo'] as const
type Brand = typeof BRANDS[number]

const BRAND_LABELS: Record<Brand, string> = {
  cars24: 'Cars24',
  teambhp: 'Team BHP',
  carinfo: 'CarInfo',
  vehicleinfo: 'Vehicle Info',
}

// ── Stories ───────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Tokens / Colors',
  parameters: { layout: 'padded' },
}
export default meta

const pageStyle: React.CSSProperties = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  maxWidth: 1200,
  margin: '0 auto',
  padding: '32px 24px',
}

const headingStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  color: '#111827',
  marginBottom: 8,
}

const subheadStyle: React.CSSProperties = {
  fontSize: 14,
  color: '#6B7280',
  marginBottom: 40,
  lineHeight: 1.6,
}

// ── Story: Primitive Palette ──────────────────────────────────────────────────

export const PrimitivePalette: StoryObj = {
  name: 'Primitive Palette',
  render: () => (
    <div style={pageStyle}>
      <h2 style={headingStyle}>Primitive Palette</h2>
      <p style={subheadStyle}>
        Raw color values. These are never used directly in components — always
        reference semantic or theme tokens instead.
        <br />Token prefix: <code>--lego-primitive-*</code>
      </p>
      {Object.entries(PRIMITIVE_GROUPS).map(([group, vars]) => (
        <SwatchGroup key={group} title={group} vars={vars} columns={vars.length > 4 ? 11 : 4} />
      ))}
    </div>
  ),
}

// ── Story: Semantic Colors ────────────────────────────────────────────────────

export const SemanticColors: StoryObj = {
  name: 'Semantic Colors',
  render: () => (
    <div style={pageStyle}>
      <h2 style={headingStyle}>Semantic Colors</h2>
      <p style={subheadStyle}>
        Intent-based color roles used in all components. These reference primitives
        and automatically resolve to the correct value.
        <br />Token prefix: <code>--lego-bg-*</code> · <code>--lego-text-*</code> · <code>--lego-icon-*</code>
      </p>
      {Object.entries(SEMANTIC_GROUPS).map(([group, vars]) => (
        <SwatchGroup key={group} title={group} vars={vars} columns={Math.min(vars.length, 8)} />
      ))}
    </div>
  ),
}

// ── Story: Brand Colors ───────────────────────────────────────────────────────

function BrandColorsStory() {
  const [brand, setBrand] = useState<Brand>('cars24')

  return (
    <div data-brand={brand} style={pageStyle}>
      <h2 style={headingStyle}>Brand Colors</h2>
      <p style={subheadStyle}>
        Per-brand color scales. Switch brands to see how the palette changes.
        Components inherit these via <code>data-brand</code> on the root element.
        <br />Token prefix: <code>--lego-brand-*</code> · <code>--lego-brand-alt-*</code>
      </p>

      {/* Brand switcher */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {BRANDS.map((b) => (
          <button
            key={b}
            onClick={() => setBrand(b)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: brand === b ? '2px solid #111827' : '1px solid #E5E7EB',
              background: brand === b ? '#111827' : '#fff',
              color: brand === b ? '#fff' : '#374151',
              fontWeight: brand === b ? 600 : 400,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {BRAND_LABELS[b]}
          </button>
        ))}
      </div>

      <SwatchGroup
        title={`${BRAND_LABELS[brand]} — Brand Primary`}
        vars={BRAND_VARS.filter(v => !v.includes('-alt-'))}
        columns={11}
      />
      <SwatchGroup
        title={`${BRAND_LABELS[brand]} — Brand Alt`}
        vars={BRAND_VARS.filter(v => v.includes('-alt-'))}
        columns={11}
      />
    </div>
  )
}

export const BrandColors: StoryObj = {
  name: 'Brand Colors',
  render: () => <BrandColorsStory />,
}
