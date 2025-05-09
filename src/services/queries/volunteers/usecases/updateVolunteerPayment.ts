import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { VolunteersPaymentsAPI } from '../volunteers.type'

type UpdateVolunteerPaymentArgs = {
	paymentId: VolunteersPaymentsAPI['id']
	data: {
		paymentType: VolunteersPaymentsAPI['paymentType']
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
