import { prisma } from '@/constants'

import { adminUser } from './data'

async function main() {
	try {
		const hasUser = await prisma.user.findUnique({
			where: {
				email: adminUser.email,
			},
		})

		if (hasUser) {
			return await prisma.$disconnect()
		}

		await prisma.user.create({
			data: adminUser,
		})
	} catch (error) {
		console.error(error)
		await prisma.$disconnect()
	}
}

main()
