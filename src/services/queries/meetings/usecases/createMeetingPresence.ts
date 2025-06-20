import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { FormMeetingPresence } from '../meetings.types'

export const createMeetingPresence = async (data: FormMeetingPresence) => {
	const response = await api.post(ENDPOINTS.CREATE_MEETING_PRESENCE, {
		...data,
	})

	return response.data
}
