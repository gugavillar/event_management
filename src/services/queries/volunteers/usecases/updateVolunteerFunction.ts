import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { VolunteersFromAPI } from '../volunteers.type'

type UpdateVolunteerFunctionArgs = {
	volunteerId: VolunteersFromAPI['id']
	roleId: string
}

export const updateVolunteerFunction = async ({
	volunteerId,
	roleId,
}: UpdateVolunteerFunctionArgs) => {
	const response = await api.patch(
		ENDPOINTS.UPDATE_VOLUNTEER_ROLE(volunteerId),
		{ roleId },
	)

	return response.data
}
