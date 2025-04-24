import { NextRequest } from 'next/server'

import { removeFunctionById } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleDelete = async (
	_: NextRequest,
	{ params }: { params: { function_id: string } },
) => {
	return await requestProcess({
		functions: async () => removeFunctionById(params.function_id),
	})
}

export { handleDelete as DELETE }
