import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

export const getParticipantsCities = async (isInterested?: boolean) => {
	const response = await api.get(ENDPOINTS.GET_PARTICIPANTS_CITIES, {
		params: {
			...(isInterested && { isInterested }),
		},
	})

	return response.data
}
