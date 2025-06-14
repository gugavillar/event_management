import { NextRequest } from 'next/server'

import { getRoomByEventId } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		event_id?: string
	}>
}

const handlerGet = async (request: NextRequest, { params }: Params) => {
	const searchParams = request.nextUrl.searchParams.get('searchMember') || ''
	const routeParam = await params.then((res) => res.event_id ?? '')
	return await requestProcess({
		functions: async () => await getRoomByEventId(routeParam, searchParams),
	})
}

export { handlerGet as GET }
