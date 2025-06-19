import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { VolunteersFunctionsFromAPI } from '../volunteers.type'

export const deleteFunction = async (
	functionId: VolunteersFunctionsFromAPI['volunteerRoleId'],
) => {
	const response = await api.delete(ENDPOINTS.DELETE_FUNCTION(functionId))

	return response.data
}
