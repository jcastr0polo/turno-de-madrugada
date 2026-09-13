import { ImageResponse } from 'next/og'
import { sitio } from '@/content/sitio'

export const alt = `${sitio.titulo} — ${sitio.serie}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Imagen Open Graph generada en build con los mismos tokens del sitio. */
export default function Og() {
  const [antes, despues] = sitio.titulo.split(sitio.tituloMarcado)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0D12',
          padding: '72px 80px',
          borderTop: '10px solid #E8F53F',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#97A2B5',
            }}
          >
            {sitio.serie}
          </div>
          <div style={{ display: 'flex', marginTop: 36, fontSize: 56, color: '#E8F53F' }}>
            {sitio.hora}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.08,
            color: '#E7EAF0',
            letterSpacing: -2,
          }}
        >
          <span style={{ display: 'flex' }}>{antes}</span>
          <span
            style={{
              display: 'flex',
              backgroundColor: '#E8F53F',
              color: '#0A0D12',
              padding: '0 12px',
            }}
          >
            {sitio.tituloMarcado}
          </span>
          <span style={{ display: 'flex' }}>{despues}</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid #1E2430',
            paddingTop: 28,
            fontSize: 26,
          }}
        >
          <div style={{ display: 'flex', color: '#E7EAF0' }}>{sitio.autora}</div>
          <div style={{ display: 'flex', color: '#97A2B5' }}>
            {sitio.asignatura} · {sitio.institucion}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
