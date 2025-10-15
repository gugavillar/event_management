import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'
import type { FormParticipant, ParticipantsAPI } from '../participants.type'

type UpdateParticipantArgs = {
	participantId: ParticipantsAPI['id']
	data: FormParticipant
}

export const updateParticipant = async ({
	participantId,
	data,
}: UpdateParticipantArgs) => {
	const response = await api.put(ENDPOINTS.UPDATE_PARTICIPANT(participantId), {
		...data,
	})

	return response.data
}
