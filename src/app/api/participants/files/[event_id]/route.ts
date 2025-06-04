import { NextRequest } from 'next/server'

import { getExportParticipantsData } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async (
	_: NextRequest,
	{ params }: { params: { eventId: string } },
) => {
	return await requestProcess({
		functions: async () => await getExportParticipantsData(params.eventId),
	})
}

export { handlerGet as GET }
