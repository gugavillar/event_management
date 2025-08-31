import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { VolunteersPaymentsAPI } from '../volunteers.type'

type CreateVolunteerPaymentArgs = {
	data: Pick<
		VolunteersPaymentsAPI,
		'paymentType' | 'eventId' | 'volunteerId'
	> & {
		paymentValue: number
		paymentReceived?: number
	}
}

export const createVolunteerPayment = async ({
	data,
}: CreateVolunteerPaymentArgs) => {
	const response = await api.post(ENDPOINTS.CREATE_VOLUNTEER_PAYMENT, {
		...data,
	})

	return response.data
}
