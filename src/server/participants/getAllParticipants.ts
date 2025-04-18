import { prisma } from '@/constants'

export const getAllParticipants = async (
	eventId: string | null,
	search: string | null,
) => {
	try {
		return await prisma.participant.findMany({
			...(eventId && { where: { eventId }, orderBy: { name: 'asc' } }),
			...(search && {
				where: {
					name: { startsWith: search },
				},
				orderBy: {
					name: 'asc',
				},
			}),
			orderBy: [{ name: 'asc' }, { createdAt: 'desc' }],
			include: {
				Address: true,
				event: true,
			},
		})
	} catch (error) {
		console.error('@getAllParticipants error:', error)
		throw Error
	}
}
