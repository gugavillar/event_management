import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

import { authOptions } from './app/api/auth/[...nextauth]/authOptions'
import { PAGES_ROLES, ROLES } from './constants'

export const runtime = 'nodejs'

export default withAuth(
	async function middleware(req) {
		const { pathname } = req.nextUrl
		const nextToken = req.nextauth.token
		const userHasPermissionToAccessPage = PAGES_ROLES[
			pathname as keyof typeof PAGES_ROLES
		].includes(nextToken?.role as ROLES)

		if (!userHasPermissionToAccessPage) {
			const dashboardURL = new URL('/dashboard', req.url)
			return NextResponse.redirect(dashboardURL)
		}
	},
	{
		cookies: authOptions?.cookies,
		callbacks: {
			authorized: ({ token }) => {
				if (!token) return false

				return !!token
			},
		},
	},
)

export const config = {
	matcher: [
		'/dashboard',
		'/eventos',
		'/participantes/:path*',
		'/voluntarios/:path*',
		'/grupos',
		'/quartos',
		'/reunioes',
		'/doacoes',
		'/usuarios',
		'/transacoes',
	],
}
