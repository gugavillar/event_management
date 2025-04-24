import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { VolunteersFunctionsFromAPI } from '../volunteers.type'

type UpdateFunctionArgs = Pick<VolunteersFunctionsFromAPI, 'id' | 'role'>

export const updateFunction = async ({ id, role }: UpdateFunctionArgs) => {
	const response = await api.put(ENDPOINTS.UPDATE_VOLUNTEER_FUNCTION(id), {
		role,
	})

	return response.data
}
