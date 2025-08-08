import { NextRequest } from 'next/server'

import { getParticipantsCities } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleGet = async (request: NextRequest) => {
	const isInterestedParams = Boolean(
		request.nextUrl.searchParams.get('isInterested'),
	)
	const eventIdParams = request.nextUrl.searchParams.get('eventId')
	return await requestProcess({
		functions: async () =>
			await getParticipantsCities(isInterestedParams, eventIdParams),
	})
}

export { handleGet as GET }
