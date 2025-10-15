import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'
import type { EventsAPI } from '../event.type'

export const deleteEvent = async (eventId: EventsAPI['id']) => {
	const response = await api.delete(ENDPOINTS.DELETE_EVENT(eventId))

	return response.data
}
