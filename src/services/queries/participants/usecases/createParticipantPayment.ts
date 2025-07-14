import { UUID } from 'crypto'

import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { ParticipantsPaymentsAPI } from '../participants.type'

type CreateParticipantPaymentArgs = {
	data: {
		paymentType: ParticipantsPaymentsAPI['paymentType']
		paymentValue: number
		eventId: UUID
		participantId: UUID
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
