import { NextRequest } from 'next/server'

import { createMeetingPresence } from '@/server'
import { FormMeetingPresence } from '@/services/queries/meetings/meetings.types'
import { requestProcess } from '@/utils/prisma'

const handlerPost = async (request: NextRequest) => {
	const body: FormMeetingPresence = await request.json()

	return await requestProcess({
		functions: async () => await createMeetingPresence(body),
		isProtectedRoute: true,
	})
}

export { handlerPost as POST }
