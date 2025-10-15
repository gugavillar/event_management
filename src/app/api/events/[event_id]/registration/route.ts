import type { NextRequest } from 'next/server'

import type { MEMBERS } from '@/constants'
import { updateRegistrationById } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		event_id: string
	}>
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.event_id ?? '')
	const data: {
		memberType: MEMBERS
		action: 'open' | 'close'
	} = await request.json()

	return await requestProcess({
		functions: async () => await updateRegistrationById(routeParams, data.memberType, data.action),
		isProtectedRoute: true,
	})
}

export { handleUpdate as PATCH }
