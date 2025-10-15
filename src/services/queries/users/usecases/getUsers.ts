import { LIMIT_PER_PAGE } from '@/constants'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetUsersParams = {
	searchUser?: string
	page: number
}

export const getUsers = async ({ searchUser, page = 1 }: GetUsersParams) => {
	const response = await api.get(ENDPOINTS.GET_USERS, {
		params: {
			...(searchUser && { searchUser }),
			limit: LIMIT_PER_PAGE,
			pageUser: page,
		},
	})

	return response.data
}
