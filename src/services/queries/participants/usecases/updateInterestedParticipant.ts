import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type UpdateInterestedParticipantArgs = {
	participantId: string
	interested: boolean
}

export const updateInterestedParticipant = async (
	data: UpdateInterestedParticipantArgs,
) => {
	const response = await api.patch(
		ENDPOINTS.UPDATE_INTERESTED_PARTICIPANT(data.participantId),
		{
			interested: data.interested,
		},
	)

	return response.data
}
