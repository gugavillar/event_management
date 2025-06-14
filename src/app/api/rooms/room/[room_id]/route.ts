import { NextRequest } from 'next/server'

import { getRoomById, removeRoomById, updateRoomById } from '@/server'
import { FormRoom } from '@/services/queries/rooms/rooms.types'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		room_id?: string
	}>
}

const handleDelete = async (_: NextRequest, { params }: Params) => {
	const routeParam = await params.then((res) => res.room_id ?? '')
	return await requestProcess({
		functions: async () => removeRoomById(routeParam),
	})
}

const handlerGet = async (_: NextRequest, { params }: Params) => {
	const routeParam = await params.then((res) => res.room_id ?? '')
	return await requestProcess({
		functions: async () => await getRoomById(routeParam),
	})
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const body: FormRoom = await request.json()
	const routeParam = await params.then((res) => res.room_id ?? '')

	return await requestProcess({
		functions: async () => await updateRoomById(body, routeParam),
	})
}

export { handleDelete as DELETE, handlerGet as GET, handleUpdate as PUT }
