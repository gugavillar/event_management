import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'
import type {
	VolunteersFunctionsForm,
	VolunteersFunctionsFromAPI,
} from '../volunteers.type'

type UpdateFunctionArgs = VolunteersFunctionsForm &
	Pick<VolunteersFunctionsFromAPI, 'id'>

export const updateFunction = async ({
	id,
	role,
	events,
}: UpdateFunctionArgs) => {
	const response = await api.put(ENDPOINTS.UPDATE_FUNCTION(id), {
		events,
		role,
	})

	return response.data
}
