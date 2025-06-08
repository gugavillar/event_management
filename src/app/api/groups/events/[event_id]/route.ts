import { NextRequest } from 'next/server'

import { getGroupByEventId } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async (
	request: NextRequest,
	{ params }: { params: { event_id: string } },
) => {
	const searchParams = request.nextUrl.searchParams.get('searchMember') || ''
	return await requestProcess({
		functions: async () =>
			await getGroupByEventId(params.event_id, searchParams),
	})
}

export { handlerGet as GET }
