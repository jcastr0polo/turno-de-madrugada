import { randomUUID } from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { encuesta } from '@/content/participacion'

export const dynamic = 'force-dynamic'

const COOKIE = 'votante'
const UN_ANIO = 60 * 60 * 24 * 365

type Conteo = Record<string, number>

function vacio(): Conteo {
  return Object.fromEntries(encuesta.opciones.map((opcion) => [opcion.id, 0]))
}

async function contar(bd: NonNullable<ReturnType<typeof supabase>>): Promise<Conteo> {
  const { data, error } = await bd.from('votos').select('opcion')
  if (error) {
    console.error('encuesta: no se pudieron contar los votos', error.message)
    return vacio()
  }

  const conteo = vacio()
  for (const fila of data ?? []) {
    const opcion = (fila as { opcion: string }).opcion
    if (opcion in conteo) conteo[opcion] += 1
  }
  return conteo
}

export async function GET(peticion: NextRequest) {
  const bd = supabase()
  if (!bd) return NextResponse.json({ configurado: false, conteo: vacio(), miVoto: null })

  const votante = peticion.cookies.get(COOKIE)?.value
  let miVoto: string | null = null

  if (votante) {
    const { data } = await bd.from('votos').select('opcion').eq('votante', votante).maybeSingle()
    miVoto = (data as { opcion: string } | null)?.opcion ?? null
  }

  return NextResponse.json({ configurado: true, conteo: await contar(bd), miVoto })
}

export async function POST(peticion: NextRequest) {
  const bd = supabase()
  if (!bd) return NextResponse.json({ error: 'sin-conexion' }, { status: 503 })

  let cuerpo: { opcion?: unknown }
  try {
    cuerpo = await peticion.json()
  } catch {
    return NextResponse.json({ error: 'cuerpo-invalido' }, { status: 400 })
  }

  const opcion = typeof cuerpo.opcion === 'string' ? cuerpo.opcion : ''
  if (!encuesta.opciones.some((o) => o.id === opcion)) {
    return NextResponse.json({ error: 'opcion-invalida' }, { status: 400 })
  }

  // Una cookie httpOnly identifica al navegante sin saber quién es. No impide
  // el voto repetido desde otro dispositivo, y no pretende hacerlo: la encuesta
  // es un pulso de lectura, no un censo.
  const existente = peticion.cookies.get(COOKIE)?.value
  const votante = existente ?? randomUUID()

  const { error } = await bd
    .from('votos')
    .upsert({ votante, opcion }, { onConflict: 'votante' })

  if (error) {
    console.error('encuesta: no se pudo registrar el voto', error.message)
    return NextResponse.json({ error: 'no-guardado' }, { status: 500 })
  }

  const respuesta = NextResponse.json({ conteo: await contar(bd), miVoto: opcion })
  if (!existente) {
    respuesta.cookies.set(COOKIE, votante, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: UN_ANIO,
    })
  }
  return respuesta
}
