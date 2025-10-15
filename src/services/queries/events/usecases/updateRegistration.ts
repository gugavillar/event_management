import type { MEMBERS } from '@/constants'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'
import type { EventsAPI } from '../event.type'

type UpdateRegistrationArgs = {
	eventId: EventsAPI['id']
	memberType: MEMBERS
	action: 'open' | 'close'
}

export const updateRegistration = async ({
	eventId,
	action,
	memberType,
}: UpdateRegistrationArgs) => {
	const response = await api.patch(
		ENDPOINTS.UPDATE_REGISTRATION_EVENT(eventId),
		{
			action,
			memberType,
		}
	)

	return response.data
}
