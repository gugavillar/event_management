import { NextRequest } from 'next/server'

import { updateVolunteerFunction } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleUpdate = async (
	request: NextRequest,
	{ params }: { params: { volunteer_id: string } },
) => {
	const body: { roles: Array<{ roleId: string; isLeader: boolean }> } =
		await request.json()

	return await requestProcess({
		functions: async () =>
			await updateVolunteerFunction(body.roles, params.volunteer_id),
	})
}

export { handleUpdate as PATCH }
