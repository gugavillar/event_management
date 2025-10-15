import type { NextRequest } from 'next/server'

import { getExportTransactions } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		event_id?: string
	}>
}

const handlerGet = async (request: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.event_id ?? '')
	return await requestProcess({
		functions: async () => await getExportTransactions(routeParams),
		isProtectedRoute: true,
	})
}

export { handlerGet as GET }
