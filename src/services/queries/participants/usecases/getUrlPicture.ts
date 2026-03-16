import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

export const getUrlPicture = async (participantId: string) => {
	const response = await api.get<{ url: string }>(ENDPOINTS.GET_PARTICIPANT_PICTURE_URL(participantId))

	return response.data
}
