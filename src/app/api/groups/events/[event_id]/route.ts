import type { NextRequest } from 'next/server'

import { getGroupByEventId } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		event_id?: string
	}>
}

const handlerGet = async (request: NextRequest, { params }: Params) => {
	const searchParams = request.nextUrl.searchParams.get('searchMember') || ''
	const routeParams = await params.then((res) => res.event_id ?? '')
	return await requestProcess({
		functions: async () => await getGroupByEventId(routeParams, searchParams),
	})
}

export { handlerGet as GET }
