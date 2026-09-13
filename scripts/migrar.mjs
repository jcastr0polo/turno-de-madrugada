/**
 * Crea las tablas de la participación en Supabase.
 *
 * Lee SUPABASE_DB_URL de .env.local y ejecuta supabase/schema.sql. El esquema
 * es idempotente (create table if not exists), así que se puede correr las
 * veces que haga falta.
 *
 *   node scripts/migrar.mjs
 */
import { readFileSync } from 'node:fs'
import pg from 'pg'

function leerEntorno() {
  const entorno = {}
  try {
    for (const linea of readFileSync('.env.local', 'utf8').split('\n')) {
      const limpia = linea.trim()
      if (!limpia || limpia.startsWith('#')) continue
      const corte = limpia.indexOf('=')
      if (corte > 0) entorno[limpia.slice(0, corte)] = limpia.slice(corte + 1).trim()
    }
  } catch {
    /* sin archivo: se intenta con el entorno del proceso */
  }
  return { ...entorno, ...process.env }
}

const { SUPABASE_DB_URL } = leerEntorno()

if (!SUPABASE_DB_URL) {
  console.error('Falta SUPABASE_DB_URL en .env.local.')
  console.error('Supabase → Project Settings → Database → Connection string → URI')
  process.exit(1)
}

const cliente = new pg.Client({
  connectionString: SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
})

try {
  await cliente.connect()
  await cliente.query(readFileSync('supabase/schema.sql', 'utf8'))

  const { rows } = await cliente.query(`
    select table_name, (select count(*) from information_schema.columns c
                        where c.table_name = t.table_name) as columnas
    from information_schema.tables t
    where table_schema = 'public' and table_name in ('aportes', 'votos')
    order by table_name
  `)

  console.log('Tablas creadas:')
  for (const fila of rows) console.log(`  ${fila.table_name} (${fila.columnas} columnas)`)
  if (rows.length < 2) {
    console.error('Faltan tablas. Revisa la salida anterior.')
    process.exit(1)
  }
} catch (error) {
  console.error('No se pudo migrar:', error.message)
  process.exit(1)
} finally {
  await cliente.end()
}
