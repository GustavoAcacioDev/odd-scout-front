/**
 * Configuração centralizada de rotas da aplicação
 */

/**
 * Rotas de autenticação - usuários logados serão redirecionados para home
 */
export const authRoutes: string[] = [
    '/sign-in',
    '/sign-up',
] as const

/**
 * Rotas públicas - acessíveis independente do status de autenticação
 */
export const publicRoutes: string[] = [
    '/',
] as const

/**
 * Prefixo das rotas da API de autenticação do next-auth
 */
export const apiAuthPrefix = '/api/auth'

/**
 * Rota padrão de redirecionamento após login
 */
export const defaultLoginRedirect = '/dashboard'

/**
 * Rota padrão de redirecionamento para login
 */
export const defaultSignInRedirect = '/sign-in'