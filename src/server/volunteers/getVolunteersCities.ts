import { prisma } from '@/constants'

export const getVolunteerCities = async (eventId: string | null) => {
	try {
		return await prisma.volunteerAddress.groupBy({
			by: ['city'],
			...(eventId && { where: { volunteer: { eventId } } }),
			orderBy: {
				city: 'asc',
			},
		})
	} catch (error) {
		console.error('@getVolunteerCities error:', error)
		throw Error
	}
}
