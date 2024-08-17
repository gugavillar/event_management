import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetEventsParams = {
	search?: string
}

export const getEvents = async ({ search }: GetEventsParams) => {
	const response = await api.get(ENDPOINTS.GET_EVENTS, {
		params: {
			...(search && { search }),
		},
	})

	return response.data
}
