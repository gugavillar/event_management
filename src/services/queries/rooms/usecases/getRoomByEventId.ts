import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { RoomAPI } from '../rooms.types'

export const getRoomByEventId = async (eventId: RoomAPI['eventId']) => {
	const response = await api.get(ENDPOINTS.GET_ROOM_BY_EVENT_ID(eventId))

	return response.data
}
