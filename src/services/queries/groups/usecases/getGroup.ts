import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'
import type { GroupAPI } from '../groups.types'

export const getGroup = async (groupId: GroupAPI['id']) => {
	const response = await api.get(ENDPOINTS.GET_GROUP(groupId))

	return response.data
}
