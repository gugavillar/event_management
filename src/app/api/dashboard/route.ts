import type { NextRequest } from 'next/server'

import { getDashboard } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async (request: NextRequest) => {
	const eventIdParams = request.nextUrl.searchParams.get('eventId')

	return await requestProcess({
		functions: async () => await getDashboard(eventIdParams),
	})
}

export { handlerGet as GET }
