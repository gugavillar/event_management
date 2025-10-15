import type { CHECK_IN_STATUS } from '@/constants'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type UpdateCheckInVolunteerArgs = {
	volunteerId: string
	status: CHECK_IN_STATUS
}

export const updateCheckInVolunteer = async (
	data: UpdateCheckInVolunteerArgs
) => {
	const response = await api.patch(
		ENDPOINTS.UPDATE_CHECK_IN_VOLUNTEER(data.volunteerId),
		{ ...data }
	)

	return response.data
}
