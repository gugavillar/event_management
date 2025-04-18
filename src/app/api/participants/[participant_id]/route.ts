import { NextRequest } from 'next/server'

import { removeParticipantById } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleDelete = async (
	_: NextRequest,
	{ params }: { params: { participant_id: string } },
) => {
	return await requestProcess({
		functions: async () => removeParticipantById(params.participant_id),
	})
}

export { handleDelete as DELETE }
