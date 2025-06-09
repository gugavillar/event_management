import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { RoomAPI } from '../rooms.types'

export const getRoomByEventId = async (
	eventId: RoomAPI['eventId'],
	searchMember: string | null,
) => {
	const response = eventId
		? await api.get(ENDPOINTS.GET_ROOM_BY_EVENT_ID(eventId), {
				params: {
					...(searchMember && { searchMember }),
				},
			})
		: { data: [] }

	return response.data
}
