import { getTemplateVolunteersFile } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async () => {
	return await requestProcess({
		functions: async () => await getTemplateVolunteersFile(),
	})
}

export { handlerGet as GET }
