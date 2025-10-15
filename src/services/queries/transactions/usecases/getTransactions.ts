import { LIMIT_PER_PAGE } from '@/constants'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetTransactionsParams = {
	eventId?: string
	searchTransaction?: string
	page: number
}

export const getTransactions = async ({
	page,
	eventId,
	searchTransaction,
}: GetTransactionsParams) => {
	const response = await api.get(ENDPOINTS.GET_TRANSACTIONS, {
		params: {
			...(eventId && { eventId }),
			...(searchTransaction && { searchTransaction }),
			limit: LIMIT_PER_PAGE,
			page,
		},
	})

	return response.data
}
