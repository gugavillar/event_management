import type { UUID } from 'crypto'

import type { ROLES } from '@/constants'

export type UserAPI = {
	id: UUID
	name: string
	email: string
	role: ROLES
	firstAccess: boolean
	deletedAt: string | null
}

export type UsersFromAPI = {
	data: Array<UserAPI>
	currentPage: number
	perPage: number
	totalCount: number
	totalPages: number
}
