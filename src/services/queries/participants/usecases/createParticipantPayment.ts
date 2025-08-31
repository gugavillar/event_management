import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { ParticipantsPaymentsAPI } from '../participants.type'

type CreateParticipantPaymentArgs = {
	data: Pick<
		ParticipantsPaymentsAPI,
		'paymentType' | 'eventId' | 'participantId'
	> & {
		paymentValue: number
		paymentReceived?: number
	}
}

export const createParticipantPayment = async ({
	data,
}: CreateParticipantPaymentArgs) => {
	const response = await api.post(ENDPOINTS.CREATE_PARTICIPANT_PAYMENT, {
		...data,
	})

	return response.data
}
