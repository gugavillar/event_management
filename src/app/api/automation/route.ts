import type { NextRequest } from 'next/server'

import { getEventData } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async (request: NextRequest) => {
	const eventIdParams = request.nextUrl.searchParams.get('eventId')

	return await requestProcess({
		functions: async () => await getEventData(eventIdParams),
		isNecessarySession: false,
	})
}

export { handlerGet as GET }
