import type { NextRequest } from 'next/server'

import { createMeeting } from '@/server'
import type { FormMeeting } from '@/services/queries/meetings/meetings.types'
import { requestProcess } from '@/utils/prisma'

const handlerPost = async (request: NextRequest) => {
	const body: FormMeeting = await request.json()

	return await requestProcess({
		functions: async () => await createMeeting(body),
		isProtectedRoute: true,
	})
}

export { handlerPost as POST }
