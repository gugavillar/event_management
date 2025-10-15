import type { NextRequest } from 'next/server'

import { createRoom } from '@/server'
import type { FormRoom } from '@/services/queries/rooms/rooms.types'
import { requestProcess } from '@/utils/prisma'

const handlerPost = async (request: NextRequest) => {
	const body: FormRoom = await request.json()

	return await requestProcess({
		functions: async () => await createRoom(body),
		isProtectedRoute: true,
	})
}

export { handlerPost as POST }
