import type { NextRequest } from 'next/server'

import type { CHECK_IN_STATUS } from '@/constants'
import { createParticipant, getAllParticipants } from '@/server'
import { requestProcess } from '@/utils/prisma'
import type { ParticipantSchemaRouteType } from './participant.schema'

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('searchParticipant')
	const eventIdParams = request.nextUrl.searchParams.get('eventId')
	const statusParams = request.nextUrl.searchParams.get('statusParticipant')
	const cityParams = request.nextUrl.searchParams.get('participantCity')
	const hasNoGroupParams = Boolean(
		request.nextUrl.searchParams.get('hasNoGroup')
	)
	const hasNoRoomParams = Boolean(request.nextUrl.searchParams.get('hasNoRoom'))
	const isInterestedParams = Boolean(
		request.nextUrl.searchParams.get('isInterested')
	)
	const pageParams =
		Number(request.nextUrl.searchParams.get('pageParticipant')) || 1
	const limitParams = Number(request.nextUrl.searchParams.get('limit'))

	return await requestProcess({
		functions: async () =>
			await getAllParticipants(
				eventIdParams,
				searchParams,
				statusParams as CHECK_IN_STATUS,
				hasNoGroupParams,
				hasNoRoomParams,
				cityParams,
				isInterestedParams,
				pageParams,
				limitParams
			),
	})
}

const handlePost = async (request: NextRequest) => {
	const inscriptionTypeParam =
		request.nextUrl.searchParams.get('inscriptionType')
	const body: ParticipantSchemaRouteType & { eventId: string } =
		await request.json()

	return await requestProcess({
		functions: async () => await createParticipant(body, inscriptionTypeParam),
		isNecessarySession: false,
	})
}

export { handlerGet as GET, handlePost as POST }
