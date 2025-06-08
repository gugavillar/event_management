import { NextRequest } from 'next/server'

import { getRoomById, removeRoomById, updateRoomById } from '@/server'
import { FormRoom } from '@/services/queries/rooms/rooms.types'
import { requestProcess } from '@/utils/prisma'

const handleDelete = async (
	_: NextRequest,
	{ params }: { params: { room_id: string } },
) => {
	return await requestProcess({
		functions: async () => removeRoomById(params.room_id),
	})
}

const handlerGet = async (
	_: NextRequest,
	{ params }: { params: { room_id: string } },
) => {
	return await requestProcess({
		functions: async () => await getRoomById(params.room_id),
	})
}

const handleUpdate = async (
	request: NextRequest,
	{ params }: { params: { room_id: string } },
) => {
	const body: FormRoom = await request.json()

	return await requestProcess({
		functions: async () => await updateRoomById(body, params.room_id),
	})
}

export { handleDelete as DELETE, handlerGet as GET, handleUpdate as PUT }
