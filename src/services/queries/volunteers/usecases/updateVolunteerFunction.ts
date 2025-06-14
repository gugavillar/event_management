import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { VolunteersAPI } from '../volunteers.type'

type UpdateVolunteerFunctionArgs = {
	volunteerId: VolunteersAPI['id']
	roles: Array<{ roleId: string }>
	onlyRemove?: boolean
}

export const updateVolunteerFunction = async ({
	volunteerId,
	roles,
	onlyRemove,
}: UpdateVolunteerFunctionArgs) => {
	const response = await api.patch(
		ENDPOINTS.UPDATE_VOLUNTEER_FUNCTION(volunteerId),
		{ roles },
		{
			params: {
				...(onlyRemove && { onlyRemove }),
			},
		},
	)

	return response.data
}
