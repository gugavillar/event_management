import type { NextRequest } from 'next/server'

import { getEventById, removeEventById, updateEventById } from '@/server'
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
		isNecessarySession: false,
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
	const body = await request.formData()
	const routeParams = await params.then((res) => res.event_id ?? '')

	return await requestProcess({
		functions: async () => await updateEventById(body, routeParams),
		isProtectedRoute: true,
	})
}

export { handlerGet as GET, handleDelete as DELETE, handleUpdate as PUT }
