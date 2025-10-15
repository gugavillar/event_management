import { LIMIT_PER_PAGE } from '@/constants'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetPaymentsParams = {
	eventId?: string
	searchParticipant?: string
	paymentType?: string
	participantCity?: string
	page: number
}
export const getPayments = async ({
	eventId,
	searchParticipant,
	paymentType,
	participantCity,
	page = 1,
}: GetPaymentsParams) => {
	const response = await api.get(ENDPOINTS.GET_PARTICIPANTS_PAYMENTS, {
		params: {
			...(eventId && { eventId }),
			...(searchParticipant && { searchParticipant }),
			...(paymentType && { paymentType }),
			...(participantCity && { participantCity }),
			limit: LIMIT_PER_PAGE,
			pageParticipantPayment: page,
		},
	})
	return response.data
}
