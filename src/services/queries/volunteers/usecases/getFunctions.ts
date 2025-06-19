import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetVolunteersFunctionsParams = {
	eventId: string
	searchFunction?: string
}

export const getFunctions = async ({
	eventId,
	searchFunction,
}: GetVolunteersFunctionsParams) => {
	const response = await api.get(ENDPOINTS.GET_FUNCTIONS, {
		params: {
			eventId,
			...(searchFunction && { searchFunction }),
		},
	})
	return response.data
}
