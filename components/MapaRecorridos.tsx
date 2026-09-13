import { capas, ordenCapas } from '@/content/capas'
import { episodio } from '@/content/episodio'
import { sitio } from '@/content/sitio'

/** Geometría dibujada a mano. Sin librería de grafos: son nueve nodos fijos. */
const CENTRO = { x: 400, y: 250, ancho: 220, alto: 66 }

const POSICIONES: Record<string, { x: number; y: number }> = {
  glosario: { x: 112, y: 92 },
  datos: { x: 400, y: 70 },
  contexto: { x: 688, y: 92 },
  metodo: { x: 688, y: 372 },
  ayuda: { x: 112, y: 372 },
  episodio: { x: 252, y: 494 },
  muro: { x: 548, y: 494 },
}

const NODO = { ancho: 196, alto: 46 }

function Nodo({
  x,
  y,
  texto,
  punteado = false,
}: {
  x: number
  y: number
  texto: string
  punteado?: boolean
}) {
  return (
    <g>
      <rect
        x={x - NODO.ancho / 2}
        y={y - NODO.alto / 2}
        width={NODO.ancho}
        height={NODO.alto}
        rx={3}
        fill="var(--color-fondo)"
        stroke="var(--color-trazo)"
        strokeWidth={1}
        strokeDasharray={punteado ? '4 5' : undefined}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-mono)"
        fontSize={13}
        fill="var(--color-texto)"
      >
        {texto}
      </text>
    </g>
  )
}

/**
 * Mapa de recorridos de la pieza. La crónica al centro, las cinco capas
 * alrededor con línea continua, y las dos piezas satélite con línea punteada.
 */
export function MapaRecorridos() {
  const satelites = [
    { id: 'episodio', texto: 'Episodio de audio', detalle: episodio.titulo },
    { id: 'muro', texto: 'Muro de aportes', detalle: 'Aportes del público' },
  ]

  const descripcion = `Diagrama de nueve nodos. En el centro, la crónica. Con línea continua se conectan las cinco capas complementarias: ${ordenCapas
    .map((id) => capas[id].etiqueta)
    .join(', ')}. Con línea punteada se conectan dos piezas satélite: el episodio de audio "${
    episodio.titulo
  }" y el muro de aportes del público. Las capas amplían el texto; las piezas punteadas lo acompañan sin repetirlo.`

  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 800 560"
        role="img"
        aria-labelledby="mapa-titulo mapa-desc"
        className="h-auto w-full max-w-[54rem]"
      >
        <title id="mapa-titulo">{sitio.secciones.mapa.titulo}</title>
        <desc id="mapa-desc">{descripcion}</desc>

        {/* Líneas continuas hacia las cinco capas. */}
        {ordenCapas.map((id) => (
          <line
            key={id}
            x1={CENTRO.x}
            y1={CENTRO.y}
            x2={POSICIONES[id].x}
            y2={POSICIONES[id].y}
            stroke="var(--color-trazo)"
            strokeWidth={1}
          />
        ))}

        {/* Líneas punteadas hacia las piezas satélite. */}
        {satelites.map((satelite) => (
          <line
            key={satelite.id}
            x1={CENTRO.x}
            y1={CENTRO.y}
            x2={POSICIONES[satelite.id].x}
            y2={POSICIONES[satelite.id].y}
            stroke="var(--color-trazo)"
            strokeWidth={1}
            strokeDasharray="5 6"
          />
        ))}

        {/* Nodo central, relleno en acento con texto oscuro. */}
        <rect
          x={CENTRO.x - CENTRO.ancho / 2}
          y={CENTRO.y - CENTRO.alto / 2}
          width={CENTRO.ancho}
          height={CENTRO.alto}
          rx={3}
          fill="var(--color-acento)"
        />
        <text
          x={CENTRO.x}
          y={CENTRO.y}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-titular)"
          fontSize={17}
          fontWeight={600}
          fill="var(--color-fondo)"
        >
          La crónica
        </text>

        {ordenCapas.map((id) => (
          <Nodo key={id} x={POSICIONES[id].x} y={POSICIONES[id].y} texto={capas[id].etiqueta} />
        ))}

        {satelites.map((satelite) => (
          <Nodo
            key={satelite.id}
            x={POSICIONES[satelite.id].x}
            y={POSICIONES[satelite.id].y}
            texto={satelite.texto}
            punteado
          />
        ))}
      </svg>

      <figcaption className="mt-6 max-w-medida text-[0.9375rem] leading-[1.7] text-apagado">
        {sitio.leyendaMapa}
      </figcaption>
    </figure>
  )
}
