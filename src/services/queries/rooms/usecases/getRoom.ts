import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'
import type { RoomAPI } from '../rooms.types'

export const getRoom = async (roomId: RoomAPI['id']) => {
	const response = await api.get(ENDPOINTS.GET_ROOM(roomId))

	return response.data
}
