import type { NextRequest } from 'next/server'

import { getVolunteerCities } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleGet = async (request: NextRequest) => {
	const eventIdParams = request.nextUrl.searchParams.get('eventId')
	return await requestProcess({
		functions: async () => await getVolunteerCities(eventIdParams),
	})
}

export { handleGet as GET }
