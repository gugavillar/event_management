import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { FormVolunteer } from '../volunteers.type'

export const createVolunteer = async (
	data: FormVolunteer & {
		eventId: string
		inscriptionType?: 'internal'
	}
) => {
	const { inscriptionType, ...rest } = data
	const response = await api.post(
		ENDPOINTS.CREATE_VOLUNTEER,
		{
			...rest,
		},
		{
			params: {
				inscriptionType,
			},
		}
	)

	return response.data
}
