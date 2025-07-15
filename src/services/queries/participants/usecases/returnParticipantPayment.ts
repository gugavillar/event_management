import { UUID } from 'crypto'

import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type ReturnParticipantPaymentArgs = {
	id: UUID
}

export const returnParticipantPayment = async ({
	id,
}: ReturnParticipantPaymentArgs) => {
	const response = await api.delete(ENDPOINTS.RETURN_PARTICIPANT_PAYMENT(id))

	return response.data
}
