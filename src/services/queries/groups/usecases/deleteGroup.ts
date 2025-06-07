import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { GroupAPI } from '../groups.types'

export const deleteGroup = async (eventId: GroupAPI['id']) => {
	const response = await api.delete(ENDPOINTS.DELETE_GROUP(eventId))

	return response.data
}
