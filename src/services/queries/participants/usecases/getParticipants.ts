import { LIMIT_PER_PAGE } from '@/constants'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetParticipantsParams = {
	eventId?: string
	searchParticipant?: string
	statusParticipant?: string
	participantCity?: string
	hasNoRoom?: boolean
	hasNoGroup?: boolean
	page: number
}
export const getParticipants = async ({
	eventId,
	searchParticipant,
	statusParticipant,
	participantCity,
	hasNoGroup,
	hasNoRoom,
	page = 1,
}: GetParticipantsParams) => {
	const response = await api.get(ENDPOINTS.GET_PARTICIPANTS, {
		params: {
			...(eventId && { eventId }),
			...(searchParticipant && { searchParticipant }),
			...(statusParticipant && { statusParticipant }),
			...(participantCity && { participantCity }),
			...(hasNoGroup && { hasNoGroup }),
			...(hasNoRoom && { hasNoRoom }),
			pageParticipant: page,
			limit: LIMIT_PER_PAGE,
		},
	})
	return response.data
}
