import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { EventsFromAPI } from '../event.type'

export const getEvent = async (eventId: EventsFromAPI['id']) => {
	const response = await api.get(ENDPOINTS.GET_EVENT(eventId))

	return response.data
}
