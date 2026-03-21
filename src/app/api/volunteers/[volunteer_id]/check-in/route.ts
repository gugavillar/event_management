import type { NextRequest } from 'next/server'

import { type UpdateCheckInVolunteerArgs, updateCheckInVolunteer } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleUpdate = async (request: NextRequest) => {
	const body: UpdateCheckInVolunteerArgs = await request.json()

	return await requestProcess({
		functions: async () => await updateCheckInVolunteer(body),
	})
}

export { handleUpdate as PATCH }
