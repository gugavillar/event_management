import { NextRequest } from 'next/server'

import { getMeetingById } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		meeting_id?: string
	}>
}

const handlerGet = async (_: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.meeting_id ?? '')

	return await requestProcess({
		functions: async () => await getMeetingById(routeParams),
	})
}

export { handlerGet as GET }
