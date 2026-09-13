import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // El CSS del sitio son 7 KB: en línea deja de ser una petición que bloquea
    // el primer renderizado.
    inlineCss: true,
  },
}

export default nextConfig
