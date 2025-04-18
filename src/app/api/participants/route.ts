import { NextRequest } from 'next/server'

import { getAllParticipants } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('search')
	const eventIdParams = request.nextUrl.searchParams.get('eventId')

	return await requestProcess({
		functions: async () =>
			await getAllParticipants(eventIdParams, searchParams),
	})
}

export { handlerGet as GET }
