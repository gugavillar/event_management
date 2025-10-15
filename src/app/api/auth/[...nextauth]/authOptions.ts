import type { NextAuthOptions } from 'next-auth'

import { prisma, ROLES } from '@/constants'
import bcrypt from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'

const COOKIE_PREFIX = 'event-manager'

export const authOptions: NextAuthOptions = {
	callbacks: {
		async jwt({ token, user }) {
			if (user?.role) {
				token.role = user.role
				token.firstAccess = user.firstAccess
			}

			return token
		},

		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.sub as string
				session.user.role = token.role
				session.user.firstAccess = token.firstAccess
			}

			return session
		},
	},
	cookies: {
		callbackUrl: {
			name: `${COOKIE_PREFIX}.callback-url`,
			options: {
				path: '/',
				sameSite: 'lax',
				secure: true,
			},
		},
		csrfToken: {
			name: `${COOKIE_PREFIX}.csrf-token`,
			options: {
				httpOnly: true,
				path: '/',
				sameSite: 'lax',
				secure: true,
			},
		},
		sessionToken: {
			name: `${COOKIE_PREFIX}.session-token`,
			options: {
				httpOnly: true,
				path: '/',
				sameSite: 'lax',
				secure: true,
			},
		},
	},

	pages: {
		signIn: '/',
	},
	providers: [
		CredentialsProvider({
			authorize: async (credentials) => {
				if (!credentials) {
					throw new Error('Credenciais inválidas!')
				}

				const { email, password } = credentials

				const user = await prisma.user.findUnique({
					where: { email },
				})

				if (!user) {
					throw new Error('Usuário não encontrado!')
				}

				const isValidPassword = bcrypt.compareSync(password, user.passwordHash)

				if (!isValidPassword) {
					throw new Error('Senha incorreta!')
				}

				const userHasRole = [ROLES.ADMIN, ROLES.USER].includes(
					user.role as ROLES
				)

				if (!userHasRole) {
					throw new Error('Usuário sem permissão!')
				}

				if (user.deletedAt) {
					throw new Error('Usuário bloqueado!')
				}

				return {
					email: user.email,
					firstAccess: user.firstAccess,
					id: user.id,
					name: user.name,
					role: user.role as ROLES,
				}
			},

			credentials: {
				email: {
					label: 'Email',
					placeholder: 'seu-emai@email.com.br',
					type: 'text',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			name: 'credentials',
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,

	session: {
		maxAge: 60 * 60 * 24, // 1 day
		strategy: 'jwt',
		updateAge: 60 * 60, // 1 hour
	},
}
