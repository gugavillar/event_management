import { prisma } from '@/lib/prisma'
import { adminUser } from './data'

async function main() {
	try {
		const hasUser = await prisma.user.findUnique({
			where: {
				email: adminUser.email,
			},
		})

		if (!hasUser) {
			await prisma.user.create({
				data: adminUser,
			})
		}
	} catch (error) {
		console.error('Erro no seed:', error)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
}

main()
