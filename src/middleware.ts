import { NextResponse } from 'next/server'
import type { NextRequestWithAuth } from 'next-auth/middleware'
import { withAuth } from 'next-auth/middleware'

import { apiAuthPrefix, authRoutes, publicRoutes } from './config/routes'

function isTokenExpired(token: any): boolean {
  if (!token?.expiresInDate) return false
  
  const now = Date.now()
  const expiresAt = new Date(token.expiresInDate).getTime()
  
  return now >= expiresAt
}

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { nextUrl } = req
    const { pathname } = nextUrl

    const isLoggedIn = !!req.nextauth.token
    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
    const isAuthRoute = authRoutes.includes(pathname)
    const isPublicRoute = publicRoutes.includes(pathname)

    // Permitir sempre rotas da API de autenticação do next-auth
    if (isApiAuthRoute) {
      return NextResponse.next()
    }

    // Se está logado e tentando acessar páginas de autenticação, redirecionar para home
    if (isAuthRoute && isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', nextUrl.origin))
    }

    // Permitir acesso a rotas públicas independente do status de autenticação
    if (isPublicRoute) {
      return NextResponse.next()
    }

    // Se não está logado e tentando acessar rota protegida, redirecionar para sign-in
    if (!isLoggedIn && !isAuthRoute) {
      const signInUrl = new URL('/sign-in', nextUrl.origin)
      return NextResponse.redirect(signInUrl)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ token }) {
        // Se não há token, permitir que o middleware execute para redirecionar
        if (!token) return true
        
        // Se token expirou, retornar false para que NextAuth trate como não autorizado
        if (isTokenExpired(token)) {
          return false
        }
        
        return true
      },
    },
  },
)

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)', { source: '/' }],
}
