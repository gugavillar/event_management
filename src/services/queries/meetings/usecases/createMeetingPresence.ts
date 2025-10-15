import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'
import type { FormMeetingPresence } from '../meetings.types'

type CreateMeetingPresenceArgs = {
	data: FormMeetingPresence
	updatePresence?: boolean
}

export const createMeetingPresence = async ({
	data,
	updatePresence,
}: CreateMeetingPresenceArgs) => {
	const response = await api.post(
		ENDPOINTS.CREATE_MEETING_PRESENCE,
		{
			...data,
		},
		{
			params: {
				...(updatePresence && {
					updatePresence,
				}),
			},
		}
	)

	return response.data
}
