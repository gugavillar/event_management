import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { ParticipantsFromAPI } from '../participants.type'

export const getParticipant = async (
	participantId: ParticipantsFromAPI['id'],
) => {
	const response = await api.get(ENDPOINTS.GET_PARTICIPANT(participantId))
	return response.data
}
