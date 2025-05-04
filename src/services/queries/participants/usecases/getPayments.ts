import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetPaymentsParams = {
	eventId?: string
	searchParticipant?: string
	paymentType?: string
}
export const getPayments = async ({
	eventId,
	searchParticipant,
	paymentType,
}: GetPaymentsParams) => {
	const response = await api.get(ENDPOINTS.GET_PARTICIPANTS_PAYMENTS, {
		params: {
			...(eventId && { eventId }),
			...(searchParticipant && { searchParticipant }),
			...(paymentType && { paymentType }),
		},
	})
	return response.data
}
