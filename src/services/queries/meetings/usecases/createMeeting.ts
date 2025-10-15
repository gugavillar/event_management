import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { FormMeeting } from '../meetings.types'

export const createMeeting = async (data: FormMeeting) => {
	const response = await api.post(ENDPOINTS.CREATE_MEETING, { ...data })

	return response.data
}
