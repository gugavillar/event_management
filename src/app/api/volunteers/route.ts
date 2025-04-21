import { NextRequest } from 'next/server'

import { CHECK_IN_STATUS } from '@/constants'
import { getAllVolunteers } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('searchVolunteer')
	const eventIdParams = request.nextUrl.searchParams.get('eventId')
	const statusParams = request.nextUrl.searchParams.get('statusVolunteer')

	return await requestProcess({
		functions: async () =>
			await getAllVolunteers(
				eventIdParams,
				searchParams,
				statusParams as (typeof CHECK_IN_STATUS)[keyof typeof CHECK_IN_STATUS],
			),
	})
}

export { handlerGet as GET }
