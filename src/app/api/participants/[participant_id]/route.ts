import { NextRequest } from 'next/server'

import {
	getParticipantById,
	removeParticipantById,
	updateParticipantById,
} from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleDelete = async (
	_: NextRequest,
	{ params }: { params: { participant_id: string } },
) => {
	return await requestProcess({
		functions: async () => removeParticipantById(params.participant_id),
	})
}

const handleGet = async (
	_: NextRequest,
	{ params }: { params: { participant_id: string } },
) => {
	return await requestProcess({
		functions: async () => await getParticipantById(params.participant_id),
	})
}

const handleUpdate = async (
	request: NextRequest,
	{ params }: { params: { participant_id: string } },
) => {
	const body = await request.json()

	return await requestProcess({
		functions: async () =>
			await updateParticipantById(body, params.participant_id),
	})
}

export { handleDelete as DELETE, handleGet as GET, handleUpdate as PUT }
