import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { VolunteersFromAPI } from '../volunteers.type'

export const getVolunteer = async (volunteerId: VolunteersFromAPI['id']) => {
	const response = await api.get(ENDPOINTS.GET_VOLUNTEER(volunteerId))
	return response.data
}
