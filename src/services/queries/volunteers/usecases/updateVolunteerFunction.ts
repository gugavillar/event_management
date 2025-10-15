import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'
import type { VolunteersAPI } from '../volunteers.type'

type UpdateVolunteerFunctionArgs = {
	volunteerId: VolunteersAPI['id']
	data: {
		roles: Array<{ roleId: string }>
		eventId: string
	}
	onlyRemove?: boolean
}

export const updateVolunteerFunction = async ({
	volunteerId,
	data,
	onlyRemove,
}: UpdateVolunteerFunctionArgs) => {
	const response = await api.patch(
		ENDPOINTS.UPDATE_VOLUNTEER_FUNCTION(volunteerId),
		{ ...data },
		{
			params: {
				...(onlyRemove && { onlyRemove }),
			},
		}
	)

	return response.data
}
