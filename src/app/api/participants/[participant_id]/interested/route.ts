import { NextRequest } from 'next/server'

import { updateInterestedParticipant } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		participant_id?: string
	}>
}

const handleUpdate = async (_: NextRequest, { params }: Params) => {
	const routeParam = await params.then((res) => res.participant_id ?? '')

	return await requestProcess({
		functions: async () => await updateInterestedParticipant(routeParam),
		isProtectedRoute: true,
	})
}

export { handleUpdate as PATCH }
