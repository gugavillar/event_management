import { prisma } from '@/constants'

export const getAllFunctions = async (search: string | null) => {
	try {
		return await prisma.volunteerRole.findMany({
			...(search && { where: { role: { contains: search } } }),
			include: {
				leader: true,
				volunteers: true,
			},
			orderBy: [{ role: 'asc' }, { createdAt: 'desc' }],
		})
	} catch (error) {
		console.error('@getAllFunctions error:', error)
		throw Error
	}
}
