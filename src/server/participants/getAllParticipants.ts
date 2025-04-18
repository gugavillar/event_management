import { prisma } from '@/constants'

const generateQuery = (eventId: string | null, search: string | null) => {
	if (eventId && search) {
		return {
			where: {
				eventId,
				name: { startsWith: search },
			},
		}
	}
	if (eventId && !search) {
		return {
			where: { eventId },
		}
	}
	if (!eventId && search) {
		return {
			where: {
				name: { startsWith: search },
			},
		}
	}
}

export const getAllParticipants = async (
	eventId: string | null,
	search: string | null,
) => {
	try {
		return await prisma.participant.findMany({
			...generateQuery(eventId, search),
			include: {
				Address: true,
				event: true,
			},
			orderBy: [{ name: 'asc' }, { createdAt: 'desc' }],
		})
	} catch (error) {
		console.error('@getAllParticipants error:', error)
		throw Error
	}
}
