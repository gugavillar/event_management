import { UUID } from 'crypto'

import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { VolunteersPaymentsAPI } from '../volunteers.type'

type CreateVolunteerPaymentArgs = {
	data: {
		paymentType: VolunteersPaymentsAPI['paymentType']
		paymentValue: number
		eventId: UUID
		volunteerId: UUID
	}
}

export const createVolunteerPayment = async ({
	data,
}: CreateVolunteerPaymentArgs) => {
	console.log(data)
	const response = await api.post(ENDPOINTS.CREATE_VOLUNTEER_PAYMENT, {
		...data,
	})

	return response.data
}
