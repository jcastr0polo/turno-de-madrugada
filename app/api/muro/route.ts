import { NextResponse, type NextRequest } from 'next/server'
import { huella, moderacionActiva, supabase } from '@/lib/supabase'
import { muro } from '@/content/participacion'

export const dynamic = 'force-dynamic'

/** Envíos permitidos desde un mismo origen dentro de la ventana. */
const LIMITE = 3
const VENTANA_MINUTOS = 10

interface Aporte {
  id: string
  alias: string
  texto: string
}

/** Aportes publicados, del más reciente al más antiguo. */
export async function GET() {
  const bd = supabase()
  if (!bd) return NextResponse.json({ configurado: false, aportes: [] })

  const { data, error } = await bd
    .from('aportes')
    .select('id, alias, texto')
    .eq('estado', 'publicado')
    .order('creado_en', { ascending: false })
    .limit(50)

  if (error) {
    console.error('muro: no se pudieron leer los aportes', error.message)
    return NextResponse.json({ configurado: true, aportes: [] }, { status: 200 })
  }

  return NextResponse.json({ configurado: true, aportes: (data ?? []) as Aporte[] })
}

export async function POST(peticion: NextRequest) {
  const bd = supabase()
  if (!bd) return NextResponse.json({ error: 'sin-conexion' }, { status: 503 })

  let cuerpo: { alias?: unknown; texto?: unknown }
  try {
    cuerpo = await peticion.json()
  } catch {
    return NextResponse.json({ error: 'cuerpo-invalido' }, { status: 400 })
  }

  const alias = typeof cuerpo.alias === 'string' ? cuerpo.alias.trim() : ''
  const texto = typeof cuerpo.texto === 'string' ? cuerpo.texto.trim() : ''

  // La validación se repite en el servidor a propósito: la del navegador se
  // salta con una petición directa.
  if (!alias || !texto) {
    return NextResponse.json({ error: 'faltan-campos' }, { status: 400 })
  }
  if (alias.length > muro.maxAlias || texto.length > muro.maxCaracteres) {
    return NextResponse.json({ error: 'demasiado-largo' }, { status: 400 })
  }

  const origen = huella(peticion)
  const desde = new Date(Date.now() - VENTANA_MINUTOS * 60_000).toISOString()

  const { count } = await bd
    .from('aportes')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', origen)
    .gte('creado_en', desde)

  if ((count ?? 0) >= LIMITE) {
    return NextResponse.json({ error: 'demasiados-envios' }, { status: 429 })
  }

  const estado = moderacionActiva() ? 'pendiente' : 'publicado'
  const { error } = await bd.from('aportes').insert({ alias, texto, estado, ip_hash: origen })

  if (error) {
    console.error('muro: no se pudo guardar el aporte', error.message)
    return NextResponse.json({ error: 'no-guardado' }, { status: 500 })
  }

  return NextResponse.json({ estado }, { status: 201 })
}
