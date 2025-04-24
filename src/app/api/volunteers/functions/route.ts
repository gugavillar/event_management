import { NextRequest } from 'next/server'

import { createFunction, getAllFunctions } from '@/server'
import { VolunteersFunctionsForm } from '@/services/queries/volunteers/volunteers.type'
import { requestProcess } from '@/utils/prisma'

const handlePost = async (request: NextRequest) => {
	const body: VolunteersFunctionsForm = await request.json()

	return await requestProcess({
		functions: async () => await createFunction(body),
	})
}

const handleGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('searchFunction')

	return await requestProcess({
		functions: async () => await getAllFunctions(searchParams),
	})
}

export { handlePost as POST, handleGet as GET }
