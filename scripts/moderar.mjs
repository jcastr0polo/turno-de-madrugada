/**
 * Moderación del muro desde la terminal.
 *
 *   npm run moderar                  lista los aportes en revisión
 *   npm run moderar -- aprobar <id>  lo publica en el muro
 *   npm run moderar -- aprobar todos publica todos los pendientes
 *   npm run moderar -- ocultar <id>  lo retira sin borrarlo
 *   npm run moderar -- publicados    lista lo que está visible
 *
 * El id admite las primeras letras: basta con que no sea ambiguo.
 */
import { readFileSync } from 'node:fs'
import pg from 'pg'

function entorno() {
  const env = {}
  try {
    for (const linea of readFileSync('.env.local', 'utf8').split('\n')) {
      const t = linea.trim()
      if (!t || t.startsWith('#')) continue
      const i = t.indexOf('=')
      if (i < 1) continue
      let v = t.slice(i + 1).trim()
      if (v.length >= 2 && v[0] === v.at(-1) && (v[0] === '"' || v[0] === "'")) v = v.slice(1, -1)
      if (v) env[t.slice(0, i).trim()] = v
    }
  } catch {
    /* sin archivo */
  }
  return { ...env, ...process.env }
}

const { SUPABASE_DB_URL } = entorno()
if (!SUPABASE_DB_URL) {
  console.error('Falta SUPABASE_DB_URL en .env.local.')
  process.exit(1)
}

const destino = new URL(SUPABASE_DB_URL)
destino.searchParams.delete('sslmode')
const cliente = new pg.Client({
  connectionString: destino.toString(),
  ssl: { rejectUnauthorized: false },
})

const [accion = 'pendientes', objetivo] = process.argv.slice(2)

function mostrar(filas) {
  if (filas.length === 0) return console.log('  (nada)')
  for (const f of filas) {
    const fecha = new Date(f.creado_en).toLocaleString('es-CO')
    console.log(`\n  ${f.id.slice(0, 8)}  ${fecha}`)
    console.log(`  ${f.alias}: ${f.texto}`)
  }
}

try {
  await cliente.connect()

  if (accion === 'pendientes' || accion === 'publicados') {
    const estado = accion === 'pendientes' ? 'pendiente' : 'publicado'
    const { rows } = await cliente.query(
      `select id, alias, texto, creado_en from public.madrugada_aportes
       where estado = $1 order by creado_en desc`,
      [estado],
    )
    console.log(`\nAportes en estado "${estado}": ${rows.length}`)
    mostrar(rows)
    if (accion === 'pendientes' && rows.length) {
      console.log('\n  Para publicar: npm run moderar -- aprobar <id>')
    }
  } else if (accion === 'aprobar' || accion === 'ocultar') {
    if (!objetivo) {
      console.error(`Falta el id. Uso: npm run moderar -- ${accion} <id|todos>`)
      process.exit(1)
    }
    const nuevo = accion === 'aprobar' ? 'publicado' : 'oculto'
    const { rows } =
      objetivo === 'todos'
        ? await cliente.query(
            `update public.madrugada_aportes set estado = $1 where estado = 'pendiente'
             returning id, alias, texto, creado_en`,
            [nuevo],
          )
        : await cliente.query(
            `update public.madrugada_aportes set estado = $1
             where id::text like $2 returning id, alias, texto, creado_en`,
            [nuevo, `${objetivo}%`],
          )
    console.log(`\n${rows.length} aporte(s) → ${nuevo}`)
    mostrar(rows)
  } else {
    console.error(`Acción desconocida: ${accion}`)
    process.exit(1)
  }
} catch (error) {
  console.error('Error:', error.message)
  process.exit(1)
} finally {
  await cliente.end()
}
