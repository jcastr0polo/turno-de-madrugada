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
      if (corte > 0) {
        let valor = limpia.slice(corte + 1).trim()
        // Los bloques que exporta Supabase vienen entrecomillados.
        if (valor.length >= 2 && valor[0] === valor.at(-1) && (valor[0] === '"' || valor[0] === "'")) {
          valor = valor.slice(1, -1)
        }
        if (valor) entorno[limpia.slice(0, corte)] = valor
      }
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

// La cadena de Supabase trae sslmode=require, que las versiones nuevas de pg
// interpretan como verify-full y anula la opción `ssl` de abajo. Se quita del
// URL para que mande la opción explícita.
//
// El tráfico sigue cifrado; lo que se salta es la validación de la cadena de
// certificados, que Node no trae para Supabase. Es una migración puntual de
// DDL contra un host conocido, no una conexión de la aplicación en producción:
// el sitio habla con Supabase por HTTPS, no por este socket.
const destino = new URL(SUPABASE_DB_URL)
destino.searchParams.delete('sslmode')

const cliente = new pg.Client({
  connectionString: destino.toString(),
  ssl: { rejectUnauthorized: false },
})

try {
  await cliente.connect()
  await cliente.query(readFileSync('supabase/schema.sql', 'utf8'))

  const { rows } = await cliente.query(`
    select table_name, (select count(*) from information_schema.columns c
                        where c.table_name = t.table_name) as columnas
    from information_schema.tables t
    where table_schema = 'public' and table_name in ('madrugada_aportes', 'madrugada_votos')
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
