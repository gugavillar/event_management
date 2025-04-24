import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetVolunteersFunctionsParams = {
	searchFunction?: string
}

export const getVolunteersFunctions = async ({
	searchFunction,
}: GetVolunteersFunctionsParams) => {
	const response = await api.get(ENDPOINTS.GET_VOLUNTEERS_FUNCTIONS, {
		params: {
			...(searchFunction && { searchFunction }),
		},
	})
	return response.data
}
