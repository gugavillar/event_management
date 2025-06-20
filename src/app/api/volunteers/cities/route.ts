import { getVolunteerCities } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleGet = async () => {
	return await requestProcess({
		functions: async () => await getVolunteerCities(),
	})
}

export { handleGet as GET }
