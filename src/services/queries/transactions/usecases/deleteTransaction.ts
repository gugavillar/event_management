import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { TransactionsAPI } from '../transactions.types'

export const deleteTransaction = async (
	transactionId: TransactionsAPI['id'],
) => {
	const response = await api.delete(ENDPOINTS.DELETE_TRANSACTION(transactionId))

	return response.data
}
