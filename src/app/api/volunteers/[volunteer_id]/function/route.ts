import { NextRequest } from 'next/server'

import { updateVolunteerFunction } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		volunteer_id?: string
	}>
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const body: {
		eventId: string
		roles: Array<{ roleId: string; isLeader: boolean }>
	} = await request.json()
	const routeParams = await params.then((res) => res.volunteer_id ?? '')
	const onlyRemove = Boolean(request.nextUrl.searchParams.get('onlyRemove'))

	return await requestProcess({
		functions: async () =>
			await updateVolunteerFunction(body, routeParams, onlyRemove),
		isProtectedRoute: true,
	})
}

export { handleUpdate as PATCH }
