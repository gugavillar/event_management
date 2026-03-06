import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { EventsAPI, FormEvent } from '../event.type'

type UpdateEventArgs = {
	eventId: EventsAPI['id']
	data: FormEvent
}

export const updateEvent = async ({ eventId, data }: UpdateEventArgs) => {
	const formData = new FormData()

	Object.entries(data).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			formData.append(key, value as any)
		}
	})
	const response = await api.put(ENDPOINTS.UPDATE_EVENT(eventId), formData)

	return response.data
}
