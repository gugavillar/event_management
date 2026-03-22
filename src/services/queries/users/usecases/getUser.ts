import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { UserAPI } from '../users.type'

export const getUser = async (userId: UserAPI['id']) => {
	const response = await api.get(ENDPOINTS.GET_USER(userId))
	return response.data
}
