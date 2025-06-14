import { NextRequest } from 'next/server'

import { removeFunctionById, updateFunctionById } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		function_id?: string
	}>
}

const handleDelete = async (_: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.function_id ?? '')
	return await requestProcess({
		functions: async () => removeFunctionById(routeParams),
	})
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const body = await request.json()
	const routeParams = await params.then((res) => res.function_id ?? '')

	return await requestProcess({
		functions: async () => await updateFunctionById(body, routeParams),
	})
}

export { handleDelete as DELETE, handleUpdate as PUT }
