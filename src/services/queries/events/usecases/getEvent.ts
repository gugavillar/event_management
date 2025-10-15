import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'
import type { EventsAPI } from '../event.type'

export const getEvent = async (eventId: EventsAPI['id']) => {
	const response = await api.get(ENDPOINTS.GET_EVENT(eventId))

	return response.data
}
