import { LIMIT_PER_PAGE } from '@/constants'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetEventsParams = {
	searchEvent?: string
	page: number
}

export const getEvents = async ({ searchEvent, page = 1 }: GetEventsParams) => {
	const response = await api.get(ENDPOINTS.GET_EVENTS, {
		params: {
			...(searchEvent && { searchEvent }),
			page,
			limit: LIMIT_PER_PAGE,
		},
	})

	return response.data
}
