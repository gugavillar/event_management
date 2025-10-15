import type { NextRequest } from 'next/server'

import { updateInterestedParticipant } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		participant_id?: string
	}>
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const body: { interested: boolean } = await request.json()
	const routeParam = await params.then((res) => res.participant_id ?? '')

	return await requestProcess({
		functions: async () => await updateInterestedParticipant(routeParam, body.interested),
		isProtectedRoute: true,
	})
}

export { handleUpdate as PATCH }
