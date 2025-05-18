import { DefaultSession } from 'next-auth'

import { UUID } from 'crypto'

import { ROLES } from '@/constants'

declare module 'next-auth' {
	interface User {
		role: ROLES
	}

	interface Session extends DefaultSession {
		user?: User
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		role: ROLES
		id: UUID
	}
}
