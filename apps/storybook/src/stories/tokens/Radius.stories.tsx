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

// Primary radius scale (from Theme collection — brand-specific)
const RADIUS_PRIMARY = [
  { name: 'radius-none', var: '--lego-radius-none', label: 'None'  },
  { name: 'radius-xxs',  var: '--lego-radius-xxs',  label: 'XXS'   },
  { name: 'radius-xs',   var: '--lego-radius-xs',   label: 'XS'    },
  { name: 'radius-sm',   var: '--lego-radius-sm',   label: 'SM'    },
  { name: 'radius-md',   var: '--lego-radius-md',   label: 'MD'    },
  { name: 'radius-lg',   var: '--lego-radius-lg',   label: 'LG'    },
  { name: 'radius-xl',   var: '--lego-radius-xl',   label: 'XL'    },
  { name: 'radius-xxl',  var: '--lego-radius-xxl',  label: 'XXL'   },
  { name: 'radius-full', var: '--lego-radius-full', label: 'Full'  },
]

// Alt radius scale (for secondary surfaces/cards)
const RADIUS_ALT = [
  { name: 'radius-alt-xxs', var: '--lego-radius-alt-xxs', label: 'Alt XXS' },
  { name: 'radius-alt-xs',  var: '--lego-radius-alt-xs',  label: 'Alt XS'  },
  { name: 'radius-alt-sm',  var: '--lego-radius-alt-sm',  label: 'Alt SM'  },
  { name: 'radius-alt-md',  var: '--lego-radius-alt-md',  label: 'Alt MD'  },
  { name: 'radius-alt-lg',  var: '--lego-radius-alt-lg',  label: 'Alt LG'  },
  { name: 'radius-alt-xl',  var: '--lego-radius-alt-xl',  label: 'Alt XL'  },
  { name: 'radius-alt-xxl', var: '--lego-radius-alt-xxl', label: 'Alt XXL' },
]

function RadiusCard({ name, cssVar, label }: { name: string; cssVar: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{
        width: '100%',
        aspectRatio: '1',
        background: 'var(--lego-bg-brand-subtle, #E0E7FF)',
        borderRadius: `var(${cssVar})`,
        border: '1.5px solid var(--lego-bg-brand-base, #4736fe)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        fontFamily: 'monospace',
        color: 'var(--lego-text-brand, #4736fe)',
        fontWeight: 600,
      }}>
        {label}
      </div>
      <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#374151' }}>
        <div style={{ fontWeight: 600, marginBottom: 2 }}>{name}</div>
        <div style={{ color: '#9CA3AF' }}>{cssVar}</div>
      </div>
    </div>
  )
}

function RadiusStory() {
  const [brand, setBrand] = useState<Brand>('cars24')

  return (
    <div data-brand={brand} style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: 1000,
      margin: '0 auto',
      padding: '32px 24px',
    }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
        Border Radius
      </h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 32, lineHeight: 1.6 }}>
        Brand-specific radius scale. Each brand uses different corner rounding to
        express personality. Switch brands to see how radius changes.
        <br />Token prefix: <code>--lego-radius-*</code> · <code>--lego-radius-alt-*</code>
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

      {/* Primary scale */}
      <h3 style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20, borderBottom: '1px solid #E5E7EB', paddingBottom: 10 }}>
        Primary Radius — used on interactive elements (buttons, inputs, chips)
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(9, 1fr)',
        gap: 16,
        marginBottom: 48,
      }}>
        {RADIUS_PRIMARY.map((r) => (
          <RadiusCard key={r.var} name={r.name} cssVar={r.var} label={r.label} />
        ))}
      </div>

      {/* Alt scale */}
      <h3 style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20, borderBottom: '1px solid #E5E7EB', paddingBottom: 10 }}>
        Alt Radius — used on containers (cards, modals, sheets)
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 16,
        marginBottom: 48,
      }}>
        {RADIUS_ALT.map((r) => (
          <RadiusCard key={r.var} name={r.name} cssVar={r.var} label={r.label} />
        ))}
      </div>

      {/* Live example */}
      <h3 style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20, borderBottom: '1px solid #E5E7EB', paddingBottom: 10 }}>
        Component radius in context
      </h3>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        {['XXS', 'XS', 'SM', 'MD', 'LG', 'Full'].map((size, i) => {
          const varName = size === 'Full' ? '--lego-radius-full' : `--lego-radius-${size.toLowerCase()}`
          return (
            <div
              key={size}
              style={{
                padding: '10px 20px',
                background: 'var(--lego-bg-brand-base, #4736fe)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                borderRadius: `var(${varName})`,
                cursor: 'default',
              }}
            >
              {size}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Tokens / Radius',
  parameters: { layout: 'padded' },
}
export default meta

export const BorderRadius: StoryObj = {
  name: 'Border Radius',
  render: () => <RadiusStory />,
}
