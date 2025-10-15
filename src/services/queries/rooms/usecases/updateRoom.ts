import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { FormRoom, RoomAPI } from '../rooms.types'

type UpdateRoomArgs = {
	roomId: RoomAPI['id']
	data: FormRoom
}

export const updateRoom = async ({ roomId, data }: UpdateRoomArgs) => {
	const response = await api.put(ENDPOINTS.UPDATE_ROOM(roomId), { ...data })

	return response.data
}
