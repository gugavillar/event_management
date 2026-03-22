import type { UUID } from 'node:crypto'

export type UserAPI = {
	id: UUID
	name: string
	email: string
	role: string
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
