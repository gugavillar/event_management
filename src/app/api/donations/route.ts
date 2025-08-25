import { NextRequest } from 'next/server'

import { createDonation, getAllDonations } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerPost = async (request: NextRequest) => {
	const data = await request.json()

	return await requestProcess({
		functions: async () => await createDonation(data),
		isProtectedRoute: true,
	})
}

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('eventId')
	const pageParams = Number(request.nextUrl.searchParams.get('page')) || 1

	return await requestProcess({
		functions: async () => await getAllDonations(searchParams, pageParams),
		isProtectedRoute: true,
	})
}

export { handlerGet as GET, handlerPost as POST }
