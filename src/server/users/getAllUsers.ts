import { LIMIT_PER_PAGE, prisma } from '@/constants'

export const getAllUsers = async (search: string | null, page = 1) => {
	try {
		const skip = (page - 1) * LIMIT_PER_PAGE

		const [users, totalOfUsers] = await Promise.all([
			prisma.user.findMany({
				...(search && {
					where: {
						name: { startsWith: search },
					},
					select: {
						id: true,
						name: true,
						email: true,
						role: true,
						firstAccess: true,
					},
					orderBy: {
						name: 'asc',
					},
				}),
				...(!search && {
					select: {
						id: true,
						name: true,
						email: true,
						role: true,
						firstAccess: true,
					},
					orderBy: {
						createdAt: 'desc',
					},
				}),
				skip,
				take: LIMIT_PER_PAGE,
			}),
			prisma.user.count({
				...(search && {
					where: {
						name: { startsWith: search },
					},
				}),
			}),
		])

		return {
			data: users,
			currentPage: page,
			perPage: LIMIT_PER_PAGE,
			totalCount: totalOfUsers,
			totalPages: Math.ceil(totalOfUsers / LIMIT_PER_PAGE),
		}
	} catch (error) {
		console.error('@getAllUsers error:', error)
		throw Error
	}
}
