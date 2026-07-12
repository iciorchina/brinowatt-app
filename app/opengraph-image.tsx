import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Brinowatt — Energy ROI Calculator for European Businesses'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #052e16 0%, #14532d 55%, #166534 100%)',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: 'linear-gradient(135deg, #4ade80, #16a34a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
            }}
          >
            🌿
          </div>
          <div style={{ display: 'flex', fontSize: 44, fontWeight: 700, color: '#ffffff' }}>
            Brino
            <span style={{ color: '#4ade80' }}>watt</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Calculate Your Energy ROI in Minutes
          </div>
          <div style={{ fontSize: 30, color: '#bbf7d0', maxWidth: 850 }}>
            Solar PV · Battery Storage · Heat Pumps — for European businesses
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ display: 'flex', gap: 56 }}>
          {[
            ['€2.4M+', 'savings calculated'],
            ['13', 'country presets'],
            ['3', 'financial scenarios'],
            ['Free', 'no registration'],
          ].map(([v, l]) => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: '#4ade80' }}>{v}</div>
              <div style={{ fontSize: 22, color: '#86efac' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
