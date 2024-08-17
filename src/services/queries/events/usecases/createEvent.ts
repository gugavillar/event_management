import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

export const createEvent = async (data: any) => {
	const response = await api.post(ENDPOINTS.CREATE_EVENT, { ...data })

	return response.data
}
