import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'
import type { VolunteersFunctionsForm } from '../volunteers.type'

export const createFunction = async (data: VolunteersFunctionsForm) => {
	const response = await api.post(ENDPOINTS.CREATE_FUNCTION, { ...data })

	return response.data
}
