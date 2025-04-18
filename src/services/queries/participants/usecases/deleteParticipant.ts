import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { ParticipantsFromAPI } from '../participants.type'

export const deleteParticipant = async (
	participantId: ParticipantsFromAPI['id'],
) => {
	const response = await api.delete(ENDPOINTS.DELETE_PARTICIPANT(participantId))

	return response.data
}
