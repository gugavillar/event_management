import { NextRequest } from 'next/server'

import { updateVolunteerFunction } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		volunteer_id?: string
	}>
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const body: { roles: Array<{ roleId: string; isLeader: boolean }> } =
		await request.json()
	const routeParams = await params.then((res) => res.volunteer_id ?? '')

	return await requestProcess({
		functions: async () =>
			await updateVolunteerFunction(body.roles, routeParams),
	})
}

export { handleUpdate as PATCH }
