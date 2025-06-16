import { NextRequest } from 'next/server'

import { MEMBERS } from '@/constants'
import { updateRegistrationById } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		event_id: string
	}>
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.event_id ?? '')
	const data: {
		memberType: MEMBERS
		action: 'open' | 'close'
	} = await request.json()

	return await requestProcess({
		functions: async () =>
			await updateRegistrationById(routeParams, data.memberType, data.action),
	})
}

export { handleUpdate as PATCH }
