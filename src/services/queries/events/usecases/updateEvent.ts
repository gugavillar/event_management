import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { EventsAPI, FormEvent } from '../event.type'

type UpdateEventArgs = {
	eventId: EventsAPI['id']
	data: FormEvent
}

export const updateEvent = async ({ eventId, data }: UpdateEventArgs) => {
	const response = await api.put(ENDPOINTS.UPDATE_EVENT(eventId), { ...data })

	return response.data
}
