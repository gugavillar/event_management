import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type UpdateInterestedParticipantArgs = {
	participantId: string
}

export const updateInterestedParticipant = async (
	data: UpdateInterestedParticipantArgs,
) => {
	const response = await api.patch(
		ENDPOINTS.UPDATE_INTERESTED_PARTICIPANT(data.participantId),
	)

	return response.data
}
