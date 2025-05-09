import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { FormVolunteer, VolunteersAPI } from '../volunteers.type'

type UpdateVolunteerArgs = {
	volunteerId: VolunteersAPI['id']
	data: FormVolunteer
}

export const updateVolunteer = async ({
	volunteerId,
	data,
}: UpdateVolunteerArgs) => {
	const response = await api.put(ENDPOINTS.UPDATE_VOLUNTEER(volunteerId), {
		...data,
	})

	return response.data
}
