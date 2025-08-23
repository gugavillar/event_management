import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { FormTransaction } from '../transations.types'

export const createTransaction = async (data: FormTransaction) => {
	const response = await api.post(ENDPOINTS.CREATE_TRANSACTION, { ...data })

	return response.data
}
