import type { DefaultSession } from 'next-auth'

import type { UUID } from 'node:crypto'

declare module 'next-auth' {
	interface User {
		role: string | null
		firstAccess: boolean
	}

	interface Session extends DefaultSession {
		user?: User
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		role: string | null
		id: UUID
		firstAccess: boolean
	}
}
