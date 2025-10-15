import type { NextRequest } from 'next/server'

import {
	type UpdateCheckInParticipantArgs,
	updateCheckInParticipant,
} from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleUpdate = async (request: NextRequest) => {
	const body: UpdateCheckInParticipantArgs = await request.json()

	return await requestProcess({
		functions: async () => await updateCheckInParticipant(body),
		isProtectedRoute: true,
	})
}

export { handleUpdate as PATCH }
