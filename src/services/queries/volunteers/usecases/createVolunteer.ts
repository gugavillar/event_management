import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { FormVolunteer } from '../volunteers.type'

export const createVolunteer = async (
	data: FormVolunteer & { eventId: string },
) => {
	const response = await api.post(ENDPOINTS.CREATE_VOLUNTEER, {
		...data,
	})

	return response.data
}
