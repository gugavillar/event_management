import { LIMIT_PER_PAGE } from '@/constants'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetPaymentsParams = {
	eventId?: string
	searchVolunteer?: string
	paymentType?: string
	volunteerCity?: string
	page: number
}
export const getPayments = async ({
	eventId,
	searchVolunteer,
	paymentType,
	volunteerCity,
	page = 1,
}: GetPaymentsParams) => {
	const response = await api.get(ENDPOINTS.GET_VOLUNTEERS_PAYMENTS, {
		params: {
			...(eventId && { eventId }),
			...(searchVolunteer && { searchVolunteer }),
			...(paymentType && { paymentType }),
			...(volunteerCity && { volunteerCity }),
			pageVolunteerPayment: page,
			limit: LIMIT_PER_PAGE,
		},
	})
	return response.data
}
