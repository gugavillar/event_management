import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

import { IS_NOT_DEVELOPMENT } from '@/constants'

import { PrismaClient } from '../../prisma/prisma/generate/prisma/client'

const globalForPrisma = globalThis as unknown as {
	prisma?: PrismaClient
}

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		adapter: new PrismaMariaDb(
			IS_NOT_DEVELOPMENT
				? {
						database: process.env.MYSQL_DATABASE,
						host: process.env.MYSQL_HOST,
						password: process.env.MYSQL_PASSWORD,
						user: process.env.MYSQL_USER,
					}
				: (process.env.DATABASE_URL as string)
		),
		log: ['error', 'warn'],
	})

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma
}
