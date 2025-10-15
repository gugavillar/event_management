import type { NextRequest } from 'next/server'

import { getExportParticipantsData } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Param = {
	params: Promise<{
		event_id?: string
	}>
}

const handlerGet = async (request: NextRequest, { params }: Param) => {
	const routeParams = await params.then((res) => res.event_id ?? '')
	const isInterested = Boolean(request.nextUrl.searchParams.get('isInterested'))
	return await requestProcess({
		functions: async () => await getExportParticipantsData(routeParams, isInterested),
	})
}

export { handlerGet as GET }
