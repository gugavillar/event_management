import { NextRequest } from 'next/server'

import { getTemplateFile, importParticipants } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerPost = async (request: NextRequest) => {
	const body = await request.formData()

	return await requestProcess({
		functions: async () => await importParticipants(body),
	})
}

const handlerGet = async () => {
	return await requestProcess({
		functions: async () => await getTemplateFile(),
	})
}

export { handlerPost as POST, handlerGet as GET }
