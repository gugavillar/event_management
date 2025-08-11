import bcrypt from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { prisma, ROLES } from '@/constants'

const COOKIE_PREFIX = 'event-manager'

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',

			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					placeholder: 'seu-emai@email.com.br',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},

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
					user.role as ROLES,
				)

				if (!userHasRole) {
					throw new Error('Usuário sem permissão!')
				}

				if (user.deletedAt) {
					throw new Error('Usuário bloqueado!')
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					role: user.role as ROLES,
					firstAccess: user.firstAccess,
				}
			},
		}),
	],

	pages: {
		signIn: '/',
	},
	secret: process.env.NEXTAUTH_SECRET,
	cookies: {
		sessionToken: {
			name: `${COOKIE_PREFIX}.session-token`,
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				secure: true,
			},
		},
		callbackUrl: {
			name: `${COOKIE_PREFIX}.callback-url`,
			options: {
				sameSite: 'lax',
				path: '/',
				secure: true,
			},
		},
		csrfToken: {
			name: `${COOKIE_PREFIX}.csrf-token`,
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				secure: true,
			},
		},
	},

	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24, // 1 day
		updateAge: 60 * 60, // 1 hour
	},

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
}
