import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Permitir acceso a recursos estáticos de Next.js
  if (url.pathname.startsWith('/_next') || url.pathname.startsWith('/static') || url.pathname.startsWith('/fonts') || url.pathname.startsWith('/images')) {
    return NextResponse.next()
  }

  // Interceptar el subdominio de mariage
  if (hostname.includes('mariage.fuegosdazur.com') || hostname.includes('mariage.localhost')) {
    // Reescribe la URL para servir el contenido de la carpeta /mariage
    return NextResponse.rewrite(new URL(`/mariage${url.pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Configurar en qué rutas se ejecutará el middleware
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
