import { NextRequest } from 'next/server'

import { updateInterestedListById } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		event_id: string
	}>
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.event_id ?? '')
	const data: {
		action: 'open' | 'close'
	} = await request.json()

	return await requestProcess({
		functions: async () =>
			await updateInterestedListById(routeParams, data.action),
		isProtectedRoute: true,
	})
}

export { handleUpdate as PATCH }
