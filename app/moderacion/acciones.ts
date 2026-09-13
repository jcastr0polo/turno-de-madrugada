'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_SESION, claveCorrecta, crearSesion, sesionValida } from '@/lib/moderacion'
import { supabase } from '@/lib/supabase'

/**
 * Las Server Actions son endpoints públicos: la sesión se comprueba dentro de
 * cada una, no solo al pintar la página.
 */
async function exigirSesion() {
  const galletas = await cookies()
  if (!sesionValida(galletas.get(COOKIE_SESION)?.value)) {
    redirect('/moderacion')
  }
}

export async function entrar(datos: FormData) {
  const intento = String(datos.get('clave') ?? '')

  if (!claveCorrecta(intento)) {
    // Un retardo fijo hace incómodo probar claves a lo bruto.
    await new Promise((listo) => setTimeout(listo, 600))
    redirect('/moderacion?error=1')
  }

  const galletas = await cookies()
  galletas.set(COOKIE_SESION, crearSesion(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/moderacion',
    maxAge: 12 * 3600,
  })
  redirect('/moderacion')
}

export async function salir() {
  const galletas = await cookies()
  galletas.delete({ name: COOKIE_SESION, path: '/moderacion' })
  redirect('/moderacion')
}

export async function cambiarEstado(id: string, estado: 'publicado' | 'oculto' | 'pendiente') {
  await exigirSesion()

  const bd = supabase()
  if (!bd) return

  const { error } = await bd.from('madrugada_aportes').update({ estado }).eq('id', id)
  if (error) console.error('moderación: no se pudo cambiar el estado', error.message)

  revalidatePath('/moderacion')
}
