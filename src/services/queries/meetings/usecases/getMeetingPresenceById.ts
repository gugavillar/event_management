import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { MeetingsFromAPI } from '../meetings.types'

export const getMeetingPresenceById = async (
	meetingId: MeetingsFromAPI['id'],
) => {
	const response = await api.get(ENDPOINTS.GET_MEETING_PRESENCE(meetingId))

	return response.data
}
