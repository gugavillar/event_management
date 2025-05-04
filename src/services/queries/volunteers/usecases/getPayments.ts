import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetPaymentsParams = {
	eventId?: string
	searchVolunteer?: string
	paymentType?: string
}
export const getPayments = async ({
	eventId,
	searchVolunteer,
	paymentType,
}: GetPaymentsParams) => {
	const response = await api.get(ENDPOINTS.GET_VOLUNTEERS_PAYMENTS, {
		params: {
			...(eventId && { eventId }),
			...(searchVolunteer && { searchVolunteer }),
			...(paymentType && { paymentType }),
		},
	})
	return response.data
}
