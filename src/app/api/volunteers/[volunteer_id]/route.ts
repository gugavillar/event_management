import { NextRequest } from 'next/server'

import { removeVolunteerById } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleDelete = async (
	_: NextRequest,
	{ params }: { params: { volunteer_id: string } },
) => {
	return await requestProcess({
		functions: async () => removeVolunteerById(params.volunteer_id),
	})
}

export { handleDelete as DELETE }
