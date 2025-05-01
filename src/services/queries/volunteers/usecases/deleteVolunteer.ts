import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { VolunteersFromAPI } from '../volunteers.type'

export const deleteVolunteer = async (volunteerId: VolunteersFromAPI['id']) => {
	const response = await api.delete(ENDPOINTS.DELETE_VOLUNTEER(volunteerId))

	return response.data
}
