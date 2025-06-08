import { NextRequest } from 'next/server'

import { getGroupById, removeGroupById, updateGroupById } from '@/server'
import { FormGroup } from '@/services/queries/groups/groups.types'
import { requestProcess } from '@/utils/prisma'

const handleDelete = async (
	_: NextRequest,
	{ params }: { params: { group_id: string } },
) => {
	return await requestProcess({
		functions: async () => removeGroupById(params.group_id),
	})
}

const handlerGet = async (
	_: NextRequest,
	{ params }: { params: { group_id: string } },
) => {
	return await requestProcess({
		functions: async () => await getGroupById(params.group_id),
	})
}

const handleUpdate = async (
	request: NextRequest,
	{ params }: { params: { group_id: string } },
) => {
	const body: FormGroup = await request.json()

	return await requestProcess({
		functions: async () => await updateGroupById(body, params.group_id),
	})
}

export { handleDelete as DELETE, handlerGet as GET, handleUpdate as PUT }
