import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { GroupAPI } from '../groups.types'

export const getGroupByEventId = async (eventId: GroupAPI['eventId'], searchMember: string | null) => {
	const response = eventId
		? await api.get(ENDPOINTS.GET_GROUP_BY_EVENT_ID(eventId), {
				params: {
					...(searchMember && { searchMember }),
				},
			})
		: { data: [] }

	return response.data
}
