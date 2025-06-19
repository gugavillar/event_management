import { NextRequest } from 'next/server'

import { getMeetingByEventId } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		event_id?: string
	}>
}

const handlerGet = async (_: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.event_id ?? '')
	return await requestProcess({
		functions: async () => await getMeetingByEventId(routeParams),
	})
}

export { handlerGet as GET }
