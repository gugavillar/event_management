import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { EventsFromAPI } from '../event.type'

type UpdateEventArgs = {
	eventId: EventsFromAPI['id']
	data: any
}

export const updateEvent = async ({ eventId, data }: UpdateEventArgs) => {
	const response = await api.put(ENDPOINTS.UPDATE_EVENT(eventId), { ...data })

	return response.data
}
