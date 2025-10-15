import type { NextRequest } from 'next/server'

import { createMeetingPresence } from '@/server'
import type { FormMeetingPresence } from '@/services/queries/meetings/meetings.types'
import { requestProcess } from '@/utils/prisma'

const handlerPost = async (request: NextRequest) => {
	const body: FormMeetingPresence = await request.json()
	const updatePresence = Boolean(
		request.nextUrl.searchParams.get('updatePresence')
	)

	return await requestProcess({
		functions: async () => await createMeetingPresence(body, updatePresence),
		isProtectedRoute: true,
	})
}

export { handlerPost as POST }
