import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { GroupAPI } from '../groups.types'

export const deleteGroup = async (groupId: GroupAPI['id']) => {
	const response = await api.delete(ENDPOINTS.DELETE_GROUP(groupId))

	return response.data
}
