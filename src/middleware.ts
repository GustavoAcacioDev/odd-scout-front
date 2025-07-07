import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import type { NextRequestWithAuth } from 'next-auth/middleware'
import {
    authRoutes,
    publicRoutes,
    apiAuthPrefix,
} from './config/routes'

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

        // Permitir acesso para todos os outros casos
        return NextResponse.next()
    },
    {
        callbacks: {
            // Esta função determina se o middleware deve ser executado
            // Retornando true, permitimos que nossa lógica personalizada seja executada
            authorized() {
                return true
            },
        },
    }
)

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)', { source: '/' }],
}