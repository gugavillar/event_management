import { CHECK_IN_STATUS } from '@/constants'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type UpdateCheckInParticipantArgs = {
	participantId: string
	status: (typeof CHECK_IN_STATUS)[keyof typeof CHECK_IN_STATUS]
}

export const updateCheckInParticipant = async (
	data: UpdateCheckInParticipantArgs,
) => {
	const response = await api.patch(
		ENDPOINTS.UPDATE_CHECK_IN_PARTICIPANT(data.participantId),
		{ ...data },
	)

	return response.data
}
