import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { createHash } from 'node:crypto'

/**
 * Cliente de Supabase **solo de servidor**.
 *
 * Usa la service role key, que salta RLS. Por eso no puede aparecer nunca en el
 * navegador: este módulo solo se importa desde Route Handlers. Las tablas
 * tienen RLS activo y cero políticas públicas, así que aunque alguien
 * consiguiera la anon key no podría leer ni escribir nada.
 *
 * Si las variables no están, devuelve null y el sitio sigue funcionando con la
 * participación en memoria. Así el nodo se puede publicar antes de tener la
 * base montada.
 */
let cliente: SupabaseClient | null | undefined

export function supabase(): SupabaseClient | null {
  if (cliente !== undefined) return cliente

  const url = process.env.SUPABASE_URL
  const clave = process.env.SUPABASE_SERVICE_ROLE_KEY

  cliente =
    url && clave
      ? createClient(url, clave, { auth: { persistSession: false } })
      : null

  return cliente
}

/** ¿Se publica al instante o pasa por revisión? Por defecto, revisión. */
export function moderacionActiva(): boolean {
  return process.env.MURO_MODERACION !== 'false'
}

/**
 * Huella de la petición para frenar el envío masivo.
 *
 * Nunca se guarda la IP: se guarda un hash con sal secreta del servidor, que no
 * se puede revertir para volver a la dirección original. Sirve para contar
 * cuántos envíos vienen del mismo sitio en los últimos minutos y para nada más.
 */
export function huella(peticion: Request): string {
  const reenviada = peticion.headers.get('x-forwarded-for') ?? ''
  const ip = reenviada.split(',')[0].trim() || 'desconocida'
  const sal = process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'sal-local'
  return createHash('sha256').update(`${ip}:${sal}`).digest('hex').slice(0, 32)
}
