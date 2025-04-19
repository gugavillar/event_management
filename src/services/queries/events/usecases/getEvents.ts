import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetEventsParams = {
	searchEvent?: string
}

export const getEvents = async ({ searchEvent }: GetEventsParams) => {
	const response = await api.get(ENDPOINTS.GET_EVENTS, {
		params: {
			...(searchEvent && { searchEvent }),
		},
	})

	return response.data
}
