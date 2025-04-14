import { NextRequest } from 'next/server'

import { getEventById, removeEventById, updateEventById } from '@/server'
import { FormEvent } from '@/services/queries/events/event.type'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async (
	_: NextRequest,
	{ params }: { params: { event_id: string } },
) => {
	return await requestProcess({
		functions: async () => await getEventById(params.event_id),
	})
}

const handleDelete = async (
	_: NextRequest,
	{ params }: { params: { event_id: string } },
) => {
	return await requestProcess({
		functions: async () => removeEventById(params.event_id),
	})
}

const handleUpdate = async (
	request: NextRequest,
	{ params }: { params: { event_id: string } },
) => {
	const body: FormEvent = await request.json()

	return await requestProcess({
		functions: async () => await updateEventById(body, params.event_id),
	})
}

export { handlerGet as GET, handleDelete as DELETE, handleUpdate as PUT }
