import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { ParticipantsPaymentsAPI } from '../participants.type'

type UpdateParticipantPaymentArgs = {
	paymentId: ParticipantsPaymentsAPI['id']
	data: {
		paymentType: ParticipantsPaymentsAPI['paymentType']
		paymentValue: number
	}
}

export const updateParticipantPayment = async ({
	paymentId,
	data,
}: UpdateParticipantPaymentArgs) => {
	const response = await api.patch(
		ENDPOINTS.UPDATE_PARTICIPANT_PAYMENT(paymentId),
		{
			...data,
		},
	)

	return response.data
}
