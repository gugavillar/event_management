import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { VolunteersAPI } from '../volunteers.type'

type UpdateVolunteerFunctionArgs = {
	volunteerId: VolunteersAPI['id']
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
