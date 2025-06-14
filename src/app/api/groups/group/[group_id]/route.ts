import { NextRequest } from 'next/server'

import { getGroupById, removeGroupById, updateGroupById } from '@/server'
import { FormGroup } from '@/services/queries/groups/groups.types'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		group_id?: string
	}>
}

const handleDelete = async (_: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.group_id ?? '')
	return await requestProcess({
		functions: async () => removeGroupById(routeParams),
	})
}

const handlerGet = async (_: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.group_id ?? '')
	return await requestProcess({
		functions: async () => await getGroupById(routeParams),
	})
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const body: FormGroup = await request.json()
	const routeParams = await params.then((res) => res.group_id ?? '')

	return await requestProcess({
		functions: async () => await updateGroupById(body, routeParams),
	})
}

export { handleDelete as DELETE, handlerGet as GET, handleUpdate as PUT }
