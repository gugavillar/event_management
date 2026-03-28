import { getEventData } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async () => {
	return await requestProcess({
		functions: async () => await getEventData(),
		isNecessarySession: false,
	})
}

export { handlerGet as GET }
