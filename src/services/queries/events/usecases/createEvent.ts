import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'
import type { FormEvent } from '../event.type'

export const createEvent = async (data: FormEvent) => {
	const response = await api.post(ENDPOINTS.CREATE_EVENT, { ...data })

	return response.data
}
