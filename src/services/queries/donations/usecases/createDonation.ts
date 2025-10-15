import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { FormDonation } from '../donations.types'

export const createDonation = async (data: FormDonation) => {
	const response = await api.post(ENDPOINTS.CREATE_DONATION, {
		...data,
	})

	return response.data
}
