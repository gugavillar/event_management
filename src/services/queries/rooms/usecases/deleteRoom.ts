import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { RoomAPI } from '../rooms.types'

export const deleteRoom = async (roomId: RoomAPI['id']) => {
	const response = await api.delete(ENDPOINTS.DELETE_ROOM(roomId))

	return response.data
}
