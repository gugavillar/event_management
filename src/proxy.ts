import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

import { authOptions } from './app/api/auth/[...nextauth]/authOptions'
import { hasPermission, ROUTE_PERMISSIONS, safeParse } from './constants'

export default withAuth(
	async function middleware(req) {
		const { pathname } = req.nextUrl
		const nextToken = req.nextauth.token
		const { data: parsedRoles, success } = safeParse(nextToken?.role)
		const requiredPermission = ROUTE_PERMISSIONS[pathname as keyof typeof ROUTE_PERMISSIONS]

		if (!success || !parsedRoles) {
			const res = NextResponse.redirect(new URL('/', req.url))
			res.cookies.delete('event-manager.session-token')
			return res
		}

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
