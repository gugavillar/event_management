import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetVolunteersParams = {
	eventId?: string
	searchVolunteer?: string
	statusVolunteer?: string
}
export const getVolunteers = async ({
	eventId,
	searchVolunteer,
	statusVolunteer,
}: GetVolunteersParams) => {
	const response = await api.get(ENDPOINTS.GET_VOLUNTEERS, {
		params: {
			...(eventId && { eventId }),
			...(searchVolunteer && { searchVolunteer }),
			...(statusVolunteer && { statusVolunteer }),
		},
	})
	return response.data
}
