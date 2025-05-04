import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { ParticipantsPaymentsFromAPI } from '../participants.type'

type UpdateParticipantPaymentArgs = {
	paymentId: ParticipantsPaymentsFromAPI['id']
	data: {
		paymentType: ParticipantsPaymentsFromAPI['paymentType']
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
