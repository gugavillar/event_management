import type { NextRequest } from 'next/server'

import type { CHECK_IN_STATUS } from '@/constants'
import { createVolunteer, getAllVolunteers } from '@/server'
import { requestProcess } from '@/utils/prisma'

import type { VolunteerSchemaRouteType } from './volunteer.schema'

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('searchVolunteer')
	const eventIdParams = request.nextUrl.searchParams.get('eventId')
	const statusParams = request.nextUrl.searchParams.get('statusVolunteer')
	const roleParams = request.nextUrl.searchParams.get('roleVolunteer')
	const cityParams = request.nextUrl.searchParams.get('volunteerCity')
	const hasNoGroupParams = Boolean(request.nextUrl.searchParams.get('hasNoGroup'))
	const hasNoRoomParams = Boolean(request.nextUrl.searchParams.get('hasNoRoom'))
	const pageParams = Number(request.nextUrl.searchParams.get('pageVolunteer')) || 1
	const limitParams = Number(request.nextUrl.searchParams.get('limit'))

	return await requestProcess({
		functions: async () =>
			await getAllVolunteers(
				eventIdParams,
				searchParams,
				statusParams as CHECK_IN_STATUS,
				roleParams,
				hasNoGroupParams,
				hasNoRoomParams,
				cityParams,
				pageParams,
				limitParams
			),
	})
}

const handlePost = async (request: NextRequest) => {
	const inscriptionTypeParam = request.nextUrl.searchParams.get('inscriptionType')
	const body: VolunteerSchemaRouteType & { eventId: string } = await request.json()

	return await requestProcess({
		functions: async () => await createVolunteer(body, inscriptionTypeParam),
		isNecessarySession: false,
	})
}

export { handlerGet as GET, handlePost as POST }
