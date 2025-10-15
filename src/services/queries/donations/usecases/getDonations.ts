import { LIMIT_PER_PAGE } from '@/constants'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetDonationsParams = {
	eventId?: string
	page: number
}

export const getDonations = async ({
	eventId,
	page = 1,
}: GetDonationsParams) => {
	const response = await api.get(ENDPOINTS.GET_DONATIONS, {
		params: {
			...(eventId && { eventId }),
			limit: LIMIT_PER_PAGE,
			page,
		},
	})

	return response.data
}
