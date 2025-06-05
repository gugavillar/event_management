import { NextRequest } from 'next/server'

import { getExportVolunteersData } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async (
	_: NextRequest,
	{ params }: { params: { event_id: string } },
) => {
	return await requestProcess({
		functions: async () => await getExportVolunteersData(params.event_id),
	})
}

export { handlerGet as GET }
