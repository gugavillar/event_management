import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { ParticipantsAPI } from '../participants.type'

export const deleteParticipant = async (participantId: ParticipantsAPI['id']) => {
	const response = await api.delete(ENDPOINTS.DELETE_PARTICIPANT(participantId))

	return response.data
}
