import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { FormParticipant } from '../participants.type'

export const createParticipant = async (
	data: FormParticipant & {
		eventId: string
		inscriptionType?: 'internal' | 'interested'
	}
) => {
	const { inscriptionType, ...rest } = data
	const response = await api.post(
		ENDPOINTS.CREATE_PARTICIPANT,
		{
			...rest,
		},
		{
			params: {
				inscriptionType,
			},
		}
	)

	return response.data
}
