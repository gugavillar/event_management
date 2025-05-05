import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type GetDashboardDataParams = {
	eventId?: string
}

export const getDashboardData = async ({ eventId }: GetDashboardDataParams) => {
	const response = await api.get(ENDPOINTS.GET_DASHBOARD, {
		params: {
			...(eventId && { eventId }),
		},
	})
	return response.data
}
