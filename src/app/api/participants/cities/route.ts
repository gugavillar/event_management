import { getParticipantsCities } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleGet = async () => {
	return await requestProcess({
		functions: async () => await getParticipantsCities(),
	})
}

export { handleGet as GET }
