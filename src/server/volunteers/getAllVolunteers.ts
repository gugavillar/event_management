import { CHECK_IN_STATUS, prisma } from '@/constants'

export const getAllVolunteers = async (
	eventId: string | null,
	search: string | null,
	status: (typeof CHECK_IN_STATUS)[keyof typeof CHECK_IN_STATUS] | null,
) => {
	try {
		return await prisma.volunteer.findMany({
			where: {
				...(eventId && { eventId }),
				...(search && { name: { startsWith: search } }),
				...(status && {
					checkIn: status !== CHECK_IN_STATUS.NOT_ANSWERED ? status : null,
				}),
			},
			include: {
				Address: true,
				event: true,
			},
			orderBy: [{ name: 'asc' }, { createdAt: 'desc' }],
		})
	} catch (error) {
		console.error('@getAllVolunteers error:', error)
		throw Error
	}
}
