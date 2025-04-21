import { NextRequest } from 'next/server'

import { getTemplateVolunteersFile, importVolunteers } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerPost = async (request: NextRequest) => {
	const body = await request.formData()

	return await requestProcess({
		functions: async () => await importVolunteers(body),
	})
}

const handlerGet = async () => {
	return await requestProcess({
		functions: async () => await getTemplateVolunteersFile(),
	})
}

export { handlerGet as GET, handlerPost as POST }
