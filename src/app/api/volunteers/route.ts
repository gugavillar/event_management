import { NextRequest } from 'next/server'

import { CHECK_IN_STATUS } from '@/constants'
import { getAllVolunteers } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('searchVolunteer')
	const eventIdParams = request.nextUrl.searchParams.get('eventId')
	const statusParams = request.nextUrl.searchParams.get('statusVolunteer')
	const pageParams =
		Number(request.nextUrl.searchParams.get('pageVolunteer')) || 1

	return await requestProcess({
		functions: async () =>
			await getAllVolunteers(
				eventIdParams,
				searchParams,
				statusParams as CHECK_IN_STATUS,
				pageParams,
			),
	})
}

export { handlerGet as GET }
