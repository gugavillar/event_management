import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { ParticipantsPaymentsAPI } from '../participants.type'

type ReturnParticipantPaymentArgs = {
	paymentId: ParticipantsPaymentsAPI['id']
	data: {
		returnValue?: number
	}
}

export const returnParticipantPayment = async ({
	paymentId,
	data,
}: ReturnParticipantPaymentArgs) => {
	const response = await api.patch(
		ENDPOINTS.RETURN_PARTICIPANT_PAYMENT(paymentId),
		{
			...data,
		},
	)

	return response.data
}
