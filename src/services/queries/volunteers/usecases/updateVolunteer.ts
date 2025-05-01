import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { FormVolunteer, VolunteersFromAPI } from '../volunteers.type'

type UpdateVolunteerArgs = {
	volunteerId: VolunteersFromAPI['id']
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
