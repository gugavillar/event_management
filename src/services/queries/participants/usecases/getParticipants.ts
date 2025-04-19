import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetParticipantsParams = {
	eventId?: string
	searchParticipant?: string
	statusParticipant?: string
}
export const getParticipants = async ({
	eventId,
	searchParticipant,
	statusParticipant,
}: GetParticipantsParams) => {
	const response = await api.get(ENDPOINTS.GET_PARTICIPANTS, {
		params: {
			...(eventId && { eventId }),
			...(searchParticipant && { searchParticipant }),
			...(statusParticipant && { statusParticipant }),
		},
	})
	return response.data
}
