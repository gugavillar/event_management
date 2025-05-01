import { NextRequest } from 'next/server'

import { updateVolunteerFunction } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleUpdate = async (
	request: NextRequest,
	{ params }: { params: { volunteer_id: string } },
) => {
	const body: { roleId: string } = await request.json()

	return await requestProcess({
		functions: async () =>
			await updateVolunteerFunction(body.roleId, params.volunteer_id),
	})
}

export { handleUpdate as PATCH }
