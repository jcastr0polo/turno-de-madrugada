import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Acceso a la página de moderación.
 *
 * Una clave compartida en variable de entorno. No es un sistema de usuarios y
 * no pretende serlo: protege un muro de una crónica, no una cuenta bancaria.
 * Lo que sí hace bien es no filtrar la clave ni aceptar sesiones falsificadas.
 */

export const COOKIE_SESION = 'moderacion'
const DURACION_HORAS = 12

export function claveConfigurada(): boolean {
  return Boolean(process.env.MODERACION_CLAVE)
}

/** Comparación en tiempo constante: una comparación normal filtra la clave. */
export function claveCorrecta(intento: string): boolean {
  const real = process.env.MODERACION_CLAVE
  if (!real) return false

  const a = Buffer.from(intento)
  const b = Buffer.from(real)
  // timingSafeEqual exige longitudes iguales, así que se comparan hashes.
  const ha = createHmac('sha256', 'cmp').update(a).digest()
  const hb = createHmac('sha256', 'cmp').update(b).digest()
  return timingSafeEqual(ha, hb)
}

function firmar(expira: number): string {
  const clave = process.env.MODERACION_CLAVE ?? ''
  return createHmac('sha256', clave).update(String(expira)).digest('hex')
}

/** Token con caducidad, firmado con la clave. No se puede fabricar sin ella. */
export function crearSesion(): string {
  const expira = Date.now() + DURACION_HORAS * 3600_000
  return `${expira}.${firmar(expira)}`
}

export function sesionValida(token: string | undefined): boolean {
  if (!token || !claveConfigurada()) return false

  const [crudo, firma] = token.split('.')
  const expira = Number(crudo)
  if (!Number.isFinite(expira) || expira < Date.now() || !firma) return false

  const esperada = Buffer.from(firmar(expira), 'hex')
  const recibida = Buffer.from(firma, 'hex')
  return esperada.length === recibida.length && timingSafeEqual(esperada, recibida)
}
