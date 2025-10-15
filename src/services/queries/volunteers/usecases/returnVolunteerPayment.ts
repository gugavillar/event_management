import type { UUID } from 'crypto'

import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type ReturnVolunteerPaymentArgs = {
	id: UUID
}

export const returnVolunteerPayment = async ({
	id,
}: ReturnVolunteerPaymentArgs) => {
	const response = await api.delete(ENDPOINTS.RETURN_VOLUNTEER_PAYMENT(id))

	return response.data
}
