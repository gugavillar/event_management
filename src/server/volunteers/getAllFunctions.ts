import { prisma } from '@/constants'

export const getAllFunctions = async (
	search: string | null,
	eventId: string,
) => {
	try {
		return await prisma.eventVolunteerRole.findMany({
			where: {
				eventId,
				...(search && { volunteerRole: { role: { contains: search } } }),
			},
			include: {
				volunteers: true,
				leaders: true,
				volunteerRole: true,
			},
			orderBy: { volunteerRole: { role: 'asc' } },
		})
	} catch (error) {
		console.error('@getAllFunctions error:', error)
		throw Error
	}
}
