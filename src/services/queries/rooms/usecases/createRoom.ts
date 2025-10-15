import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'
import type { FormRoom } from '../rooms.types'

export const createRoom = async (data: FormRoom) => {
	const response = await api.post(ENDPOINTS.CREATE_ROOM, { ...data })

	return response.data
}
