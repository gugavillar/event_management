import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetParticipantsParams = {
	eventId?: string
	search?: string
}
export const getParticipants = async ({
	eventId,
	search,
}: GetParticipantsParams) => {
	const response = await api.get(ENDPOINTS.GET_PARTICIPANTS, {
		params: {
			...(eventId && { eventId }),
			...(search && { search }),
		},
	})
	return response.data
}
