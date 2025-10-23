import type { DefaultSession } from 'next-auth'

import type { UUID } from 'node:crypto'

import type { ROLES } from '@/constants'

declare module 'next-auth' {
	interface User {
		role: ROLES
		firstAccess: boolean
	}

	interface Session extends DefaultSession {
		user?: User
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		role: ROLES
		id: UUID
		firstAccess: boolean
	}
}
