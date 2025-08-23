import { LIMIT_PER_PAGE } from '@/constants'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetTransactionsParams = {
	eventId?: string
	page: number
}

export const getTransactions = async ({
	page,
	eventId,
}: GetTransactionsParams) => {
	const response = await api.get(ENDPOINTS.GET_TRANSACTIONS, {
		params: {
			...(eventId && { eventId }),
			page,
			limit: LIMIT_PER_PAGE,
		},
	})

	return response.data
}
