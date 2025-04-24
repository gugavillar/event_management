import { NextRequest } from 'next/server'

import { removeFunctionById, updateFunctionById } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleDelete = async (
	_: NextRequest,
	{ params }: { params: { function_id: string } },
) => {
	return await requestProcess({
		functions: async () => removeFunctionById(params.function_id),
	})
}

const handleUpdate = async (
	request: NextRequest,
	{ params }: { params: { function_id: string } },
) => {
	const body = await request.json()

	return await requestProcess({
		functions: async () => await updateFunctionById(body, params.function_id),
	})
}

export { handleDelete as DELETE, handleUpdate as PUT }
