import { NextRequest } from 'next/server'

import { createFunction } from '@/server'
import { VolunteersFunctionsForm } from '@/services/queries/volunteers/volunteers.type'
import { requestProcess } from '@/utils/prisma'

const handlePost = async (request: NextRequest) => {
	const body: VolunteersFunctionsForm = await request.json()

	return await requestProcess({
		functions: async () => await createFunction(body),
	})
}

export { handlePost as POST }
