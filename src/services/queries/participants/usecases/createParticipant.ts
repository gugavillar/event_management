import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { FormParticipant } from '../participants.type'

export const createParticipant = async (
	data: FormParticipant & { eventId: string },
) => {
	const response = await api.post(ENDPOINTS.CREATE_PARTICIPANT, {
		...data,
	})

	return response.data
}
