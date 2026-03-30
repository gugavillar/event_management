import { prisma } from '@/lib/prisma'

export const getAllFunctions = async (search: string | null, eventId: string) => {
	try {
		return await prisma.eventVolunteerRole.findMany({
			include: {
				leaders: true,
				volunteerRole: true,
				volunteers: true,
			},
			orderBy: { volunteerRole: { role: 'asc' } },
			where: {
				eventId,
				...(search && { volunteerRole: { role: { contains: search, mode: 'insensitive' } } }),
			},
		})
	} catch (error) {
		console.error('@getAllFunctions error:', error)
		throw Error
	}
}
