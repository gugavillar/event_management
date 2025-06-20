import { prisma } from '@/constants'

export const getVolunteerCities = async () => {
	try {
		return await prisma.volunteerAddress.groupBy({
			by: ['city'],
			orderBy: {
				city: 'asc',
			},
		})
	} catch (error) {
		console.error('@getVolunteerCities error:', error)
		throw Error
	}
}
