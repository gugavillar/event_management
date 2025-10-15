import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { MeetingsFromAPI } from '../meetings.types'

export const getMeeting = async (meetingId: MeetingsFromAPI['id']) => {
	const response = await api.get(ENDPOINTS.GET_MEETING(meetingId))

	return response.data
}
