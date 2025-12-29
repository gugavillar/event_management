import { LIMIT_PER_PAGE } from '@/constants'
import { prisma } from '@/lib/prisma'

export const getAllUsers = async (search: string | null, page = 1) => {
	try {
		const skip = (page - 1) * LIMIT_PER_PAGE

		const [users, totalOfUsers] = await Promise.all([
			prisma.user.findMany({
				...(search && {
					where: {
						name: { contains: search },
					},
				}),
				orderBy: {
					name: 'asc',
				},
				select: {
					deletedAt: true,
					email: true,
					firstAccess: true,
					id: true,
					name: true,
					role: true,
				},
				skip,
				take: LIMIT_PER_PAGE,
			}),
			prisma.user.count({
				...(search && {
					where: {
						name: { contains: search },
					},
				}),
			}),
		])

		return {
			currentPage: page,
			data: users,
			perPage: LIMIT_PER_PAGE,
			totalCount: totalOfUsers,
			totalPages: Math.ceil(totalOfUsers / LIMIT_PER_PAGE),
		}
	} catch (error) {
		console.error('@getAllUsers error:', error)
		throw Error
	}
}
