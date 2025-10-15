import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { ParticipantsAPI } from '../participants.type'

export const getParticipant = async (participantId: ParticipantsAPI['id']) => {
	const response = await api.get(ENDPOINTS.GET_PARTICIPANT(participantId))
	return response.data
}
