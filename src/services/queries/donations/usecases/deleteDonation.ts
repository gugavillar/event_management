import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { DonationAPI } from '../donations.types'

export const deleteDonation = async (donationId: DonationAPI['id']) => {
	const response = await api.delete(ENDPOINTS.DELETE_DONATION(donationId))

	return response.data
}
