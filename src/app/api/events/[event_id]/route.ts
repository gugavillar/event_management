import { NextRequest } from 'next/server'

import { getEventById, removeEventById, updateEventById } from '@/server'
import { FormEvent } from '@/services/queries/events/event.type'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		event_id?: string
	}>
}

const handlerGet = async (_: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.event_id ?? '')
	return await requestProcess({
		functions: async () => await getEventById(routeParams),
	})
}

const handleDelete = async (_: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.event_id ?? '')
	return await requestProcess({
		functions: async () => removeEventById(routeParams),
		isProtectedRoute: true,
	})
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const body: FormEvent = await request.json()
	const routeParams = await params.then((res) => res.event_id ?? '')

	return await requestProcess({
		functions: async () => await updateEventById(body, routeParams),
		isProtectedRoute: true,
	})
}

export { handlerGet as GET, handleDelete as DELETE, handleUpdate as PUT }
