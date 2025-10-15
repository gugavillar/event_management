import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { EventsAPI } from '../../events/event.type'

export const getMeetingsByEventId = async (eventId: EventsAPI['id']) => {
	const response = await api.get(ENDPOINTS.GET_MEETINGS_BY_EVENT_ID(eventId))

	return response.data
}
