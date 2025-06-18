import { NextRequest } from 'next/server'

import {
	getParticipantById,
	removeParticipantById,
	updateParticipantById,
} from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		participant_id?: string
	}>
}

const handleDelete = async (_: NextRequest, { params }: Params) => {
	const routeParam = await params.then((res) => res.participant_id ?? '')
	return await requestProcess({
		functions: async () => removeParticipantById(routeParam),
		isProtectedRoute: true,
	})
}

const handleGet = async (_: NextRequest, { params }: Params) => {
	const routeParam = await params.then((res) => res.participant_id ?? '')
	return await requestProcess({
		functions: async () => await getParticipantById(routeParam),
	})
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const body = await request.json()
	const routeParam = await params.then((res) => res.participant_id ?? '')

	return await requestProcess({
		functions: async () => await updateParticipantById(body, routeParam),
		isProtectedRoute: true,
	})
}

export { handleDelete as DELETE, handleGet as GET, handleUpdate as PUT }
