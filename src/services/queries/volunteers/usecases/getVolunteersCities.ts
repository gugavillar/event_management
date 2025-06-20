import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

export const getVolunteersCities = async () => {
	const response = await api.get(ENDPOINTS.GET_VOLUNTEERS_CITIES)

	return response.data
}
