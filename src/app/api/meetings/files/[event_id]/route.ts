import { NextRequest } from 'next/server'

import { getExportPresenceMeeting } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Param = {
	params: Promise<{
		event_id?: string
	}>
}

const handlerGet = async (_: NextRequest, { params }: Param) => {
	const routeParams = await params.then((res) => res.event_id ?? '')
	return await requestProcess({
		functions: async () => await getExportPresenceMeeting(routeParams),
	})
}

export { handlerGet as GET }
