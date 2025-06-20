import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

export const getParticipantsCities = async () => {
	const response = await api.get(ENDPOINTS.GET_PARTICIPANTS_CITIES)

	return response.data
}
