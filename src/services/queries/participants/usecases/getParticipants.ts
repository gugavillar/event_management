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
	isInterested?: boolean
	page: number
	limitPerPage?: number
}
export const getParticipants = async ({
	eventId,
	searchParticipant,
	statusParticipant,
	participantCity,
	hasNoGroup,
	hasNoRoom,
	isInterested,
	page = 1,
	limitPerPage = LIMIT_PER_PAGE,
}: GetParticipantsParams) => {
	const response = await api.get(ENDPOINTS.GET_PARTICIPANTS, {
		params: {
			...(eventId && { eventId }),
			...(searchParticipant && { searchParticipant }),
			...(statusParticipant && { statusParticipant }),
			...(participantCity && { participantCity }),
			...(hasNoGroup && { hasNoGroup }),
			...(hasNoRoom && { hasNoRoom }),
			...(isInterested && { isInterested }),
			pageParticipant: page,
			limit: limitPerPage,
		},
	})
	return response.data
}
