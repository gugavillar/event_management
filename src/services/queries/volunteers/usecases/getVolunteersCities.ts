import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

export const getVolunteersCities = async (eventId?: string) => {
	const response = await api.get(ENDPOINTS.GET_VOLUNTEERS_CITIES, {
		params: {
			...(eventId && { eventId }),
		},
	})

	return response.data
}
