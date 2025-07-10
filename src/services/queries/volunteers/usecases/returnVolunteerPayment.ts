import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { VolunteersPaymentsAPI } from '../volunteers.type'

type ReturnVolunteerPaymentArgs = {
	paymentId: VolunteersPaymentsAPI['id']
	data: {
		returnValue?: number
	}
}

export const returnVolunteerPayment = async ({
	paymentId,
	data,
}: ReturnVolunteerPaymentArgs) => {
	const response = await api.patch(
		ENDPOINTS.RETURN_VOLUNTEER_PAYMENT(paymentId),
		{
			...data,
		},
	)

	return response.data
}
