import { NextRequest } from 'next/server'

import { removeGroupById } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleDelete = async (
	_: NextRequest,
	{ params }: { params: { group_id: string } },
) => {
	return await requestProcess({
		functions: async () => removeGroupById(params.group_id),
	})
}

export { handleDelete as DELETE }
