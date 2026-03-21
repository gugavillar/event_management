import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

import { authOptions } from './app/api/auth/[...nextauth]/authOptions'
import { hasPermission, ROUTE_PERMISSIONS } from './constants'

export default withAuth(
	async function middleware(req) {
		const { pathname } = req.nextUrl
		const nextToken = req.nextauth.token
		const parsedRoles = JSON.parse(nextToken?.role || '{}')
		const requiredPermission = ROUTE_PERMISSIONS[pathname]

		if (!requiredPermission) {
			return NextResponse.next()
		}

		const allowed = hasPermission(parsedRoles, requiredPermission)

		if (!allowed) {
			return NextResponse.redirect(new URL('/dashboard', req.url))
		}

		return NextResponse.next()
	},
	{
		callbacks: {
			authorized: ({ token }) => {
				if (!token) return false

				return !!token
			},
		},
		cookies: authOptions?.cookies,
	}
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
