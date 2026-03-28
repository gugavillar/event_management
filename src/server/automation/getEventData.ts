import { CHECK_IN_STATUS } from '@/constants'
import { prisma } from '@/lib/prisma'

const queries = async (eventId: string | null) => {
	const [participants, volunteers, participantsCities] = await Promise.all([
		prisma.participant.findMany({
			include: {
				event: {
					select: {
						name: true,
					},
				},
			},
			where: {
				...(eventId && { eventId }),
				AND: {
					OR: [{ interested: false }, { interested: null }],
				},
				OR: [{ checkIn: null }, { checkIn: { not: CHECK_IN_STATUS.WITHDREW } }],
			},
		}),
		prisma.volunteer.findMany({
			where: {
				...(eventId && { eventId }),
				OR: [{ checkIn: null }, { checkIn: { not: CHECK_IN_STATUS.WITHDREW } }],
			},
		}),
		prisma.participantAddress.groupBy({
			_count: true,
			by: ['city'],
			where: {
				...(eventId && { participant: { eventId } }),
				AND: {
					OR: [{ participant: { interested: false } }, { participant: { interested: null } }],
				},
				OR: [{ participant: { checkIn: null } }, { participant: { checkIn: { not: CHECK_IN_STATUS.WITHDREW } } }],
			},
		}),
	])

	return {
		participants,
		participantsCities,
		volunteers,
	}
}

export const getEventData = async (eventId: string | null) => {
	try {
		const { participantsCities, participants, volunteers } = await queries(eventId)

		const totalOfParticipants = participants.length
		const totalOfVolunteers = volunteers.length
		const eventName = participants[0]?.event.name || 'Evento'

		const formattedCitiesCount = participantsCities.map((item) => ({
			city: item.city,
			quantity: item._count,
		}))

		return {
			eventName,
			participants: totalOfParticipants,
			participantsCities: formattedCitiesCount,
			volunteers: totalOfVolunteers,
		}
	} catch (error) {
		console.error('@getEventData error:', error)
		throw Error
	}
}
