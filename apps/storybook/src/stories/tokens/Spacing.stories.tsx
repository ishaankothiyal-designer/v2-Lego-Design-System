import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

// ── Data ──────────────────────────────────────────────────────────────────────

const GAP_TOKENS = [
  { name: 'gap-none',  var: '--lego-gap-none',  value: '0px'   },
  { name: 'gap-2',     var: '--lego-gap-2',      value: '2px'   },
  { name: 'gap-4',     var: '--lego-gap-4',      value: '4px'   },
  { name: 'gap-6',     var: '--lego-gap-6',      value: '6px'   },
  { name: 'gap-8',     var: '--lego-gap-8',      value: '8px'   },
  { name: 'gap-10',    var: '--lego-gap-10',     value: '10px'  },
  { name: 'gap-12',    var: '--lego-gap-12',     value: '12px'  },
  { name: 'gap-14',    var: '--lego-gap-14',     value: '14px'  },
  { name: 'gap-16',    var: '--lego-gap-16',     value: '16px'  },
  { name: 'gap-18',    var: '--lego-gap-18',     value: '18px'  },
  { name: 'gap-20',    var: '--lego-gap-20',     value: '20px'  },
  { name: 'gap-24',    var: '--lego-gap-24',     value: '24px'  },
  { name: 'gap-28',    var: '--lego-gap-28',     value: '28px'  },
  { name: 'gap-32',    var: '--lego-gap-32',     value: '32px'  },
  { name: 'gap-36',    var: '--lego-gap-36',     value: '36px'  },
  { name: 'gap-40',    var: '--lego-gap-40',     value: '40px'  },
  { name: 'gap-48',    var: '--lego-gap-48',     value: '48px'  },
  { name: 'gap-56',    var: '--lego-gap-56',     value: '56px'  },
  { name: 'gap-64',    var: '--lego-gap-64',     value: '64px'  },
  { name: 'gap-72',    var: '--lego-gap-72',     value: '72px'  },
  { name: 'gap-80',    var: '--lego-gap-80',     value: '80px'  },
  { name: 'gap-88',    var: '--lego-gap-88',     value: '88px'  },
  { name: 'gap-96',    var: '--lego-gap-96',     value: '96px'  },
  { name: 'gap-100',   var: '--lego-gap-100',    value: '100px' },
]

const STROKE_TOKENS = [
  { name: 'stroke-none',    var: '--lego-stroke-none',    value: '0px',   label: 'None' },
  { name: 'stroke-thin',    var: '--lego-stroke-thin',    value: '0.5px', label: 'Thin' },
  { name: 'stroke-regular', var: '--lego-stroke-regular', value: '1px',   label: 'Regular' },
  { name: 'stroke-medium',  var: '--lego-stroke-medium',  value: '1.5px', label: 'Medium' },
  { name: 'stroke-thick',   var: '--lego-stroke-thick',   value: '2px',   label: 'Thick' },
  { name: 'stroke-thicker', var: '--lego-stroke-thicker', value: '3px',   label: 'Thicker' },
]

const OPACITY_TOKENS = [
  { name: 'opacity-none', var: '--lego-opacity-none', value: '0'    },
  { name: 'opacity-10',   var: '--lego-opacity-10',   value: '0.10' },
  { name: 'opacity-20',   var: '--lego-opacity-20',   value: '0.20' },
  { name: 'opacity-30',   var: '--lego-opacity-30',   value: '0.30' },
  { name: 'opacity-40',   var: '--lego-opacity-40',   value: '0.40' },
  { name: 'opacity-50',   var: '--lego-opacity-50',   value: '0.50' },
  { name: 'opacity-60',   var: '--lego-opacity-60',   value: '0.60' },
  { name: 'opacity-70',   var: '--lego-opacity-70',   value: '0.70' },
  { name: 'opacity-80',   var: '--lego-opacity-80',   value: '0.80' },
  { name: 'opacity-90',   var: '--lego-opacity-90',   value: '0.90' },
  { name: 'opacity-100',  var: '--lego-opacity-100',  value: '1'    },
]

// ── Styles ────────────────────────────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  maxWidth: 900,
  margin: '0 auto',
  padding: '32px 24px',
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: '#6B7280',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 20,
  marginTop: 48,
  borderBottom: '1px solid #E5E7EB',
  paddingBottom: 10,
}

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '140px 1fr 60px',
  gap: 16,
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px solid #F9FAFB',
}

// ── Stories ───────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Tokens / Spacing',
  parameters: { layout: 'padded' },
}
export default meta

export const GapScale: StoryObj = {
  name: 'Gap Scale',
  render: () => (
    <div style={pageStyle}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
        Spacing — Gap Scale
      </h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 40, lineHeight: 1.6 }}>
        Used for padding, margin, and gap in layouts and components.
        <br />Token prefix: <code>--lego-gap-*</code>
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 60px', gap: 16, paddingBottom: 12, borderBottom: '2px solid #E5E7EB', fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        <div>Token</div>
        <div>Visual</div>
        <div>Value</div>
      </div>

      {GAP_TOKENS.map((t) => (
        <div key={t.var} style={rowStyle}>
          <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#374151' }}>
            {t.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', height: 20 }}>
            <div style={{
              width: `var(${t.var})`,
              minWidth: t.value === '0px' ? 2 : undefined,
              height: 12,
              background: t.value === '0px' ? '#E5E7EB' : '#4736fe',
              borderRadius: 2,
            }} />
          </div>
          <div style={{ fontSize: 12, color: '#9CA3AF', fontFamily: 'monospace' }}>
            {t.value}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const StrokeScale: StoryObj = {
  name: 'Stroke Scale',
  render: () => (
    <div style={pageStyle}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
        Stroke Scale
      </h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 40, lineHeight: 1.6 }}>
        Border widths used across inputs, cards, dividers, and interactive elements.
        <br />Token prefix: <code>--lego-stroke-*</code>
      </p>

      {STROKE_TOKENS.map((t) => (
        <div key={t.var} style={{ ...rowStyle, gridTemplateColumns: '140px 1fr 60px', padding: '16px 0' }}>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#374151' }}>{t.name}</div>
            <div style={{ fontSize: 11, color: '#9CA3AF' }}>{t.label}</div>
          </div>
          <div style={{
            height: 40,
            border: `var(${t.var}) solid #4736fe`,
            borderRadius: 8,
            background: '#F9FAFB',
          }} />
          <div style={{ fontSize: 12, color: '#9CA3AF', fontFamily: 'monospace' }}>
            {t.value}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const OpacityScale: StoryObj = {
  name: 'Opacity Scale',
  render: () => (
    <div style={pageStyle}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
        Opacity Scale
      </h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 40, lineHeight: 1.6 }}>
        Used for overlays, disabled states, and ghost elements.
        <br />Token prefix: <code>--lego-opacity-*</code>
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 16,
      }}>
        {OPACITY_TOKENS.map((t) => (
          <div key={t.var} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
              height: 56,
              background: '#4736fe',
              opacity: parseFloat(t.value),
              borderRadius: 8,
              border: '1px solid rgba(0,0,0,0.08)',
            }} />
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#374151' }}>
              <div style={{ fontWeight: 600 }}>{t.name}</div>
              <div style={{ color: '#9CA3AF' }}>{t.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}
