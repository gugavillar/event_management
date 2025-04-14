import { prisma } from '@/constants'

export const getAllEvents = async (search: string | null) => {
	try {
		return await prisma.event.findMany({
			...(search && {
				where: {
					name: { startsWith: search },
				},
				orderBy: {
					name: 'asc',
				},
			}),
			...(!search && {
				orderBy: {
					createdAt: 'desc',
				},
			}),
		})
	} catch (error) {
		console.error('@getAllEvents error:', error)
		throw Error
	}
}
