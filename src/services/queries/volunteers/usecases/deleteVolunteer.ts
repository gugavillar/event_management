import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { VolunteersAPI } from '../volunteers.type'

export const deleteVolunteer = async (volunteerId: VolunteersAPI['id']) => {
	const response = await api.delete(ENDPOINTS.DELETE_VOLUNTEER(volunteerId))

	return response.data
}
