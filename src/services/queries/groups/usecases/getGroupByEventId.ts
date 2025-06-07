import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { GroupAPI } from '../groups.types'

export const getGroupByEventId = async (eventId: GroupAPI['eventId']) => {
	const response = await api.get(ENDPOINTS.GET_GROUP_BY_EVENT_ID(eventId))

	return response.data
}
