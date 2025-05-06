import { NextRequest } from 'next/server'

import { CHECK_IN_STATUS } from '@/constants'
import { getAllParticipants } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('searchParticipant')
	const eventIdParams = request.nextUrl.searchParams.get('eventId')
	const statusParams = request.nextUrl.searchParams.get('statusParticipant')

	return await requestProcess({
		functions: async () =>
			await getAllParticipants(
				eventIdParams,
				searchParams,
				statusParams as CHECK_IN_STATUS,
			),
	})
}

export { handlerGet as GET }
