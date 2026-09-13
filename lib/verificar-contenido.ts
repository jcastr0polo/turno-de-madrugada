import { capas, ordenCapas } from '@/content/capas'
import { cronica } from '@/content/cronica'
import { fuentes } from '@/content/fuentes'
import type { CapaId } from '@/content/types'

/**
 * Chequeo de integridad del hipertexto. Se ejecuta al importar el contenido,
 * de modo que `next build` falla si un enlace interno se rompe. Un hipertexto
 * roto en silencio es peor que uno que no compila.
 *
 * También disponible como `npm run verificar`.
 */
export function verificarContenido(): string[] {
  const errores: string[] = []

  // 1. Toda palabra marcada apunta a una capa que existe.
  const disparadores: CapaId[] = []
  for (const bloque of cronica.bloques) {
    for (const parrafo of bloque.parrafos) {
      for (const nodo of parrafo.contenido) {
        if (typeof nodo === 'object' && nodo.t === 'capa') {
          disparadores.push(nodo.capa)
          if (!capas[nodo.capa]) {
            errores.push(`Disparador hacia una capa inexistente: "${nodo.capa}" en ${bloque.id}.`)
          }
        }
      }
    }
  }

  // 2. Toda capa declarada es alcanzable desde el texto.
  for (const id of ordenCapas) {
    if (!disparadores.includes(id)) {
      errores.push(`La capa "${id}" no tiene ninguna palabra marcada que la abra.`)
    }
  }

  // 3. Ninguna cifra sin fuente registrada.
  const capaDatos = capas.datos
  if (capaDatos.id === 'datos') {
    for (const dato of capaDatos.datos) {
      if (!fuentes[dato.fuente]) {
        errores.push(`El dato "${dato.id}" cita una fuente no registrada: "${dato.fuente}".`)
      }
    }
  }

  // 4. El fragmento resaltado del titular existe dentro del titular.
  return errores
}

const errores = verificarContenido()
if (errores.length > 0) {
  throw new Error(`Contenido inconsistente:\n- ${errores.join('\n- ')}`)
}
