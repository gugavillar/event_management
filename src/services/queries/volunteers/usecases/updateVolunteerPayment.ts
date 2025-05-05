import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { VolunteersPaymentsFromAPI } from '../volunteers.type'

type UpdateVolunteerPaymentArgs = {
	paymentId: VolunteersPaymentsFromAPI['id']
	data: {
		paymentType: VolunteersPaymentsFromAPI['paymentType']
		paymentValue: number
	}
}

export const updateVolunteerPayment = async ({
	paymentId,
	data,
}: UpdateVolunteerPaymentArgs) => {
	const response = await api.patch(
		ENDPOINTS.UPDATE_VOLUNTEER_PAYMENT(paymentId),
		{
			...data,
		},
	)

	return response.data
}
