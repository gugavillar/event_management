import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { VolunteersAPI } from '../volunteers.type'

export const getVolunteer = async (volunteerId: VolunteersAPI['id']) => {
	const response = await api.get(ENDPOINTS.GET_VOLUNTEER(volunteerId))
	return response.data
}
