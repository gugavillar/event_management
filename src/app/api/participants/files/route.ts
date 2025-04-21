import { NextRequest } from 'next/server'

import { importParticipants, getTemplateParticipantsFile } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerPost = async (request: NextRequest) => {
	const body = await request.formData()

	return await requestProcess({
		functions: async () => await importParticipants(body),
	})
}

const handlerGet = async () => {
	return await requestProcess({
		functions: async () => await getTemplateParticipantsFile(),
	})
}

export { handlerPost as POST, handlerGet as GET }
