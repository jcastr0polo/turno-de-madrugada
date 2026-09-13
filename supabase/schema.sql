-- Esquema de la participación de "El turno de la madrugada".
-- Pegar en Supabase → SQL Editor → Run.

-- ---------------------------------------------------------------------------
-- Aportes del muro
-- ---------------------------------------------------------------------------
create table if not exists public.aportes (
  id        uuid primary key default gen_random_uuid(),
  creado_en timestamptz not null default now(),
  alias     text not null check (char_length(trim(alias)) between 1 and 24),
  texto     text not null check (char_length(trim(texto)) between 1 and 180),
  -- Los aportes no se publican solos. La pieza trata de salud mental y lleva
  -- el nombre de la autora: lo que aparezca en el muro es responsabilidad suya.
  estado    text not null default 'pendiente'
            check (estado in ('pendiente', 'publicado', 'oculto')),
  -- Hash con sal del servidor, no la IP. Solo sirve para limitar el envío
  -- masivo desde un mismo origen.
  ip_hash   text
);

create index if not exists aportes_publicados_idx
  on public.aportes (estado, creado_en desc);
create index if not exists aportes_origen_idx
  on public.aportes (ip_hash, creado_en desc);

-- ---------------------------------------------------------------------------
-- Votos de la encuesta
-- ---------------------------------------------------------------------------
create table if not exists public.votos (
  votante   uuid primary key,
  opcion    text not null,
  creado_en timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Cierre: RLS activo y ninguna política pública.
--
-- Nadie llega a estas tablas desde un navegador. Solo el servidor del sitio,
-- con la service role key, que nunca sale de las variables de entorno.
-- ---------------------------------------------------------------------------
alter table public.aportes enable row level security;
alter table public.votos   enable row level security;

-- Para moderar: en Table Editor, cambiar `estado` de 'pendiente' a 'publicado'.
-- O desde SQL:
--   update public.aportes set estado = 'publicado' where id = '...';
