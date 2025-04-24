import { prisma } from '@/constants'

export const getAllFunctions = async (search: string | null) => {
	try {
		return await prisma.volunteerRole.findMany({
			...(search && { where: { role: { startsWith: search } } }),
			orderBy: [{ role: 'asc' }, { createdAt: 'desc' }],
		})
	} catch (error) {
		console.error('@getAllFunctions error:', error)
		throw Error
	}
}
