import type { NextRequest } from 'next/server'

import { saveParticipantPicture } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleUpdate = async (request: NextRequest) => {
	const body = await request.formData()

	return await requestProcess({
		functions: async () => await saveParticipantPicture(body),
		isProtectedRoute: true,
	})
}

export { handleUpdate as PATCH }
