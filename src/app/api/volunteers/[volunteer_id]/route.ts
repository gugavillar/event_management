import { NextRequest } from 'next/server'

import {
	getVolunteerById,
	removeVolunteerById,
	updateVolunteerById,
} from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleDelete = async (
	_: NextRequest,
	{ params }: { params: { volunteer_id: string } },
) => {
	return await requestProcess({
		functions: async () => removeVolunteerById(params.volunteer_id),
	})
}

const handleGet = async (
	_: NextRequest,
	{ params }: { params: { volunteer_id: string } },
) => {
	return await requestProcess({
		functions: async () => await getVolunteerById(params.volunteer_id),
	})
}

const handleUpdate = async (
	request: NextRequest,
	{ params }: { params: { volunteer_id: string } },
) => {
	const body = await request.json()

	return await requestProcess({
		functions: async () => await updateVolunteerById(body, params.volunteer_id),
	})
}

export { handleDelete as DELETE, handleGet as GET, handleUpdate as PUT }
