import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { HUELLA_MARCADOR, episodio } from '@/content/episodio'

/**
 * ¿Lo que hay en `public/audio/` sigue siendo el archivo provisional?
 *
 * Se resuelve comparando la huella del archivo real, no con un interruptor que
 * alguien tenga que acordarse de bajar. Reemplazar el MP3 basta: en el
 * siguiente despliegue el aviso se va solo.
 *
 * Solo se puede llamar desde el servidor.
 */
export function suenaElMarcador(): boolean {
  try {
    const ruta = join(process.cwd(), 'public', episodio.archivo)
    const huella = createHash('sha256').update(readFileSync(ruta)).digest('hex')
    return huella === HUELLA_MARCADOR
  } catch {
    // Sin archivo no hay marcador que anunciar: del fallo de carga ya avisa
    // el propio reproductor.
    return false
  }
}
