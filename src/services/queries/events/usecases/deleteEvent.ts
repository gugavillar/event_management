import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { EventsFromAPI } from '../event.type'

export const deleteEvent = async (eventId: EventsFromAPI['id']) => {
	const response = await api.delete(ENDPOINTS.DELETE_EVENT(eventId))

	return response.data
}
