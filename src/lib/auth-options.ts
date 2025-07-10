import { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

import { loginUserServer } from '@/services/auth/auth-service-server'
import { createLogServer } from '@/services/general/log-service-server'
import { getTokenData } from '@/utils/get-token-data'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Email',
        },
        password: { label: 'Password', type: 'password', placeholder: 'Senha' },
        token: { label: 'Token', type: 'text', placeholder: 'Token' },
      },

      async authorize(credentials) {
        if (
          !credentials?.email &&
          !credentials?.password &&
          !credentials?.token
        )
          return null

        const reqBody = {
          email: credentials.email,
          password: credentials.password,
        }

        const res = await loginUserServer(reqBody)

        console.log(`auth options response`, res)

        if (!res.isSuccess) {
          console.log('Authentication failed 1')
          createLogServer({
            block: 'authorize failed',
            component: 'authOptions',
            error: res.errors[0],
            route: '/sign-in',
          })
          throw new Error(res.errors[0])
        }

        const user = res.value

        if (user) {
          console.log('Authentication successful', user)
          return user
        } else {
          console.log('Authentication failed')

          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user } as JWT

      return token
    },

    async session({ token, session }) {
      session.user = {
        accessToken: token.accessToken as string,
        expiresIn: token.expiresIn,
        expiresInDate: token.expiresInDate,
      }

      return session
    },

    async signIn({ user }) {
      const userInformation = getTokenData(user.accessToken)

      if (!userInformation) return false

      return true
    },
  },

  session: {
    maxAge: 60 * 60 * 16,
  },

  pages: {
    signIn: '/sign-in',
  },
}
