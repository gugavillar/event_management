import { LIMIT_PER_PAGE } from '@/constants'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetVolunteersParams = {
	eventId?: string
	searchVolunteer?: string
	statusVolunteer?: string
	roleVolunteer?: string
	hasNoRoom?: boolean
	hasNoGroup?: boolean
	volunteerCity?: string
	page: number
}
export const getVolunteers = async ({
	eventId,
	searchVolunteer,
	statusVolunteer,
	roleVolunteer,
	volunteerCity,
	hasNoRoom,
	hasNoGroup,
	page = 1,
}: GetVolunteersParams) => {
	const response = await api.get(ENDPOINTS.GET_VOLUNTEERS, {
		params: {
			...(eventId && { eventId }),
			...(searchVolunteer && { searchVolunteer }),
			...(statusVolunteer && { statusVolunteer }),
			...(roleVolunteer && { roleVolunteer }),
			...(hasNoGroup && { hasNoGroup }),
			...(hasNoRoom && { hasNoRoom }),
			...(volunteerCity && { volunteerCity }),
			pageVolunteer: page,
			limit: LIMIT_PER_PAGE,
		},
	})
	return response.data
}
