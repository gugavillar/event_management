import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { EventsAPI } from '../event.type'

type UpdateInterestedArgs = {
	eventId: EventsAPI['id']
	action: 'open' | 'close'
}

export const updateInterested = async ({ eventId, action }: UpdateInterestedArgs) => {
	const response = await api.patch(ENDPOINTS.UPDATE_INTERESTED_EVENT(eventId), {
		action,
	})

	return response.data
}
