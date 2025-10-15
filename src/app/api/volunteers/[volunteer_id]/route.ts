import type { NextRequest } from 'next/server'

import {
	getVolunteerById,
	removeVolunteerById,
	updateVolunteerById,
} from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		volunteer_id?: string
	}>
}

const handleDelete = async (_: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.volunteer_id ?? '')
	return await requestProcess({
		functions: async () => removeVolunteerById(routeParams),
		isProtectedRoute: true,
	})
}

const handleGet = async (_: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.volunteer_id ?? '')
	return await requestProcess({
		functions: async () => await getVolunteerById(routeParams),
	})
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const body = await request.json()
	const routeParams = await params.then((res) => res.volunteer_id ?? '')

	return await requestProcess({
		functions: async () => await updateVolunteerById(body, routeParams),
		isProtectedRoute: true,
	})
}

export { handleDelete as DELETE, handleGet as GET, handleUpdate as PUT }
