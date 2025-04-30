import { NextRequest } from 'next/server'

import {
	updateCheckInParticipant,
	UpdateCheckInParticipantArgs,
} from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleUpdate = async (request: NextRequest) => {
	const body: UpdateCheckInParticipantArgs = await request.json()

	return await requestProcess({
		functions: async () => await updateCheckInParticipant(body),
	})
}

export { handleUpdate as PATCH }
