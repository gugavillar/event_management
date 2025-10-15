import type { NextRequest } from 'next/server'

import { createFunction, getAllFunctions } from '@/server'
import type { VolunteersFunctionsForm } from '@/services/queries/volunteers/volunteers.type'
import { requestProcess } from '@/utils/prisma'

const handlePost = async (request: NextRequest) => {
	const body: VolunteersFunctionsForm = await request.json()

	return await requestProcess({
		functions: async () => await createFunction(body),
		isProtectedRoute: true,
	})
}

const handleGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('searchFunction')
	const eventParams = request.nextUrl.searchParams.get('eventId') || ''

	return await requestProcess({
		functions: async () => await getAllFunctions(searchParams, eventParams),
	})
}

export { handlePost as POST, handleGet as GET }
