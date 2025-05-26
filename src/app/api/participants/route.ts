import { NextRequest } from 'next/server'

import { CHECK_IN_STATUS } from '@/constants'
import { createParticipant, getAllParticipants } from '@/server'
import { requestProcess } from '@/utils/prisma'

import { ParticipantSchemaRouteType } from './participant.schema'

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('searchParticipant')
	const eventIdParams = request.nextUrl.searchParams.get('eventId')
	const statusParams = request.nextUrl.searchParams.get('statusParticipant')
	const pageParams =
		Number(request.nextUrl.searchParams.get('pageParticipant')) || 1

	return await requestProcess({
		functions: async () =>
			await getAllParticipants(
				eventIdParams,
				searchParams,
				statusParams as CHECK_IN_STATUS,
				pageParams,
			),
	})
}

const handlePost = async (request: NextRequest) => {
	const body: ParticipantSchemaRouteType & { eventId: string } =
		await request.json()

	return await requestProcess({
		functions: async () => await createParticipant(body),
		isNecessarySession: false,
	})
}

export { handlerGet as GET, handlePost as POST }
