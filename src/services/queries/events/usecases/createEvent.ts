import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { FormEvent } from '../event.type'

export const createEvent = async (data: FormEvent) => {
	const formData = new FormData()

	Object.entries(data).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			formData.append(key, value as any)
		}
	})

	const response = await api.post(ENDPOINTS.CREATE_EVENT, formData)

	return response.data
}
