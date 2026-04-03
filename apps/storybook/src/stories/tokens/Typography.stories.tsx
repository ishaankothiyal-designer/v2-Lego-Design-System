import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

const BRANDS = ['cars24', 'teambhp', 'carinfo', 'vehicleinfo'] as const
type Brand = typeof BRANDS[number]
const BRAND_LABELS: Record<Brand, string> = {
  cars24: 'Cars24',
  teambhp: 'Team BHP',
  carinfo: 'CarInfo',
  vehicleinfo: 'Vehicle Info',
}

// ── Type scale definition ─────────────────────────────────────────────────────

interface TypeStyle {
  name: string
  sizeVar: string
  lineHeightVar: string
  weights: string[]
  sampleText: string
}

const TYPE_SCALE: TypeStyle[] = [
  {
    name: 'Title / Display 1',
    sizeVar: '--lego-font-size-title-display-1',
    lineHeightVar: '--lego-line-height-title-display-1',
    weights: ['medium', 'semibold', 'bold'],
    sampleText: 'Find your perfect car',
  },
  {
    name: 'Title / Display 2',
    sizeVar: '--lego-font-size-title-display-2',
    lineHeightVar: '--lego-line-height-title-display-2',
    weights: ['medium', 'semibold', 'bold'],
    sampleText: 'Buy. Sell. Finance.',
  },
  {
    name: 'Headline / H1',
    sizeVar: '--lego-font-size-headline-h1',
    lineHeightVar: '--lego-line-height-headline-h1',
    weights: ['semibold', 'bold'],
    sampleText: 'Over 40,000 cars available',
  },
  {
    name: 'Headline / H2',
    sizeVar: '--lego-font-size-headline-h2',
    lineHeightVar: '--lego-line-height-headline-h2',
    weights: ['semibold', 'bold'],
    sampleText: 'Verified by our experts',
  },
  {
    name: 'Headline / H3',
    sizeVar: '--lego-font-size-headline-h3',
    lineHeightVar: '--lego-line-height-headline-h3',
    weights: ['semibold', 'bold'],
    sampleText: 'No hidden charges',
  },
  {
    name: 'Headline / H4',
    sizeVar: '--lego-font-size-headline-h4',
    lineHeightVar: '--lego-line-height-headline-h4',
    weights: ['semibold', 'bold'],
    sampleText: 'Zero-cost EMI options',
  },
  {
    name: 'Headline / H5',
    sizeVar: '--lego-font-size-headline-h5',
    lineHeightVar: '--lego-line-height-headline-h5',
    weights: ['semibold', 'bold'],
    sampleText: 'Free RC transfer',
  },
  {
    name: 'Headline / H6',
    sizeVar: '--lego-font-size-headline-h6',
    lineHeightVar: '--lego-line-height-headline-h6',
    weights: ['semibold', 'bold'],
    sampleText: '5-day money back',
  },
  {
    name: 'Utility / Label 1',
    sizeVar: '--lego-font-size-utility-label-1',
    lineHeightVar: '--lego-line-height-utility-label-1',
    weights: ['regular', 'medium', 'semibold'],
    sampleText: 'View all filters',
  },
  {
    name: 'Utility / Label 2',
    sizeVar: '--lego-font-size-utility-label-2',
    lineHeightVar: '--lego-line-height-utility-label-2',
    weights: ['regular', 'medium', 'semibold'],
    sampleText: 'Sort by: Relevance',
  },
  {
    name: 'Utility / Label 3',
    sizeVar: '--lego-font-size-utility-label-3',
    lineHeightVar: '--lego-line-height-utility-label-3',
    weights: ['regular', 'medium', 'semibold'],
    sampleText: '12,450 results found',
  },
  {
    name: 'Utility / Label 4',
    sizeVar: '--lego-font-size-utility-label-4',
    lineHeightVar: '--lego-line-height-utility-label-4',
    weights: ['regular', 'medium', 'semibold'],
    sampleText: 'Last updated 2 mins ago',
  },
  {
    name: 'Paragraph / Body 1',
    sizeVar: '--lego-font-size-paragraph-body-1',
    lineHeightVar: '--lego-line-height-paragraph-body-1',
    weights: ['regular'],
    sampleText: 'All our cars undergo a 200-point inspection by certified mechanics before listing.',
  },
  {
    name: 'Paragraph / Body 2',
    sizeVar: '--lego-font-size-paragraph-body-2',
    lineHeightVar: '--lego-line-height-paragraph-body-2',
    weights: ['regular'],
    sampleText: 'Ownership transfer and documentation handled end-to-end by our team.',
  },
  {
    name: 'Paragraph / Body 3',
    sizeVar: '--lego-font-size-paragraph-body-3',
    lineHeightVar: '--lego-line-height-paragraph-body-3',
    weights: ['regular'],
    sampleText: 'Prices are inclusive of GST. Bank charges may apply.',
  },
  {
    name: 'Paragraph / Fine Print',
    sizeVar: '--lego-font-size-utility-fine-print',
    lineHeightVar: '--lego-line-height-utility-fine-print',
    weights: ['regular'],
    sampleText: '*Terms and conditions apply. Subject to availability.',
  },
  {
    name: 'Caption / MD',
    sizeVar: '--lego-font-size-caption-md',
    lineHeightVar: '--lego-line-height-caption-md',
    weights: ['regular'],
    sampleText: 'FEATURED',
  },
  {
    name: 'Caption / SM',
    sizeVar: '--lego-font-size-caption-sm',
    lineHeightVar: '--lego-line-height-caption-sm',
    weights: ['regular'],
    sampleText: 'NEW ARRIVAL',
  },
]

const WEIGHT_MAP: Record<string, number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

// ── Component ─────────────────────────────────────────────────────────────────

function TypeRow({ style }: { style: TypeStyle }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '200px 1fr 120px 120px',
      gap: 16,
      padding: '20px 0',
      borderBottom: '1px solid #F3F4F6',
      alignItems: 'start',
    }}>
      {/* Meta */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 4 }}>
          {style.name}
        </div>
        <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#9CA3AF' }}>
          {style.sizeVar}
        </div>
      </div>

      {/* Samples per weight */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {style.weights.map((w) => (
          <div key={w} style={{
            fontSize: `var(${style.sizeVar})`,
            lineHeight: `var(${style.lineHeightVar})`,
            fontWeight: WEIGHT_MAP[w],
            color: '#111827',
            fontFamily: `var(--lego-font-family-primary, system-ui)`,
          }}>
            {style.sampleText}
          </div>
        ))}
      </div>

      {/* Size */}
      <div style={{ fontSize: 12, color: '#6B7280', fontFamily: 'monospace' }}>
        {style.sizeVar.replace('--lego-font-size-', '')}
        <br />
        <span style={{ color: '#9CA3AF', fontSize: 10 }}>size</span>
      </div>

      {/* Weights */}
      <div style={{ fontSize: 12, color: '#6B7280' }}>
        {style.weights.join(', ')}
      </div>
    </div>
  )
}

function TypographyStory() {
  const [brand, setBrand] = useState<Brand>('cars24')

  return (
    <div data-brand={brand} style={{
      fontFamily: `var(--lego-font-family-primary, system-ui)`,
      maxWidth: 1100,
      margin: '0 auto',
      padding: '32px 24px',
    }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
        Typography
      </h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 32, lineHeight: 1.6 }}>
        Type scale sourced from Figma. Font family, size and line-height are
        responsive — values below reflect mobile. Fonts switch per brand.
        <br />Token prefix: <code>--lego-font-size-*</code> · <code>--lego-line-height-*</code>
      </p>

      {/* Brand switcher */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
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

      {/* Font family info */}
      <div style={{
        background: '#F9FAFB',
        borderRadius: 10,
        padding: '16px 20px',
        marginBottom: 40,
        display: 'flex',
        gap: 32,
        fontSize: 13,
      }}>
        <div>
          <div style={{ fontWeight: 600, color: '#374151', marginBottom: 4 }}>Font Family</div>
          <div style={{ fontFamily: 'monospace', color: '#6B7280' }}>
            var(--lego-font-family-primary)
          </div>
          <div style={{
            marginTop: 8,
            fontSize: 28,
            fontFamily: `var(--lego-font-family-primary, system-ui)`,
            fontWeight: 600,
            color: '#111827',
          }}>
            Aa Bb Cc
          </div>
        </div>
        <div style={{ borderLeft: '1px solid #E5E7EB', paddingLeft: 32 }}>
          <div style={{ fontWeight: 600, color: '#374151', marginBottom: 4 }}>Weights available</div>
          {['Regular (400)', 'Medium (500)', 'SemiBold (600)', 'Bold (700)'].map((w) => (
            <div key={w} style={{
              fontSize: 14,
              color: '#374151',
              fontFamily: `var(--lego-font-family-primary, system-ui)`,
              fontWeight: w.includes('400') ? 400 : w.includes('500') ? 500 : w.includes('600') ? 600 : 700,
              lineHeight: 1.8,
            }}>
              {w}
            </div>
          ))}
        </div>
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr 120px 120px',
        gap: 16,
        paddingBottom: 12,
        borderBottom: '2px solid #E5E7EB',
        fontSize: 11,
        fontWeight: 600,
        color: '#9CA3AF',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        <div>Style</div>
        <div>Sample</div>
        <div>Size token</div>
        <div>Weights</div>
      </div>

      {TYPE_SCALE.map((s) => <TypeRow key={s.name} style={s} />)}
    </div>
  )
}

// ── Meta & Export ─────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Tokens / Typography',
  parameters: { layout: 'padded' },
}
export default meta

export const TypeScale: StoryObj = {
  name: 'Type Scale',
  render: () => <TypographyStory />,
}
