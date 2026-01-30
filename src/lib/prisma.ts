import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

import { PrismaClient } from '../../prisma/prisma/generate/prisma/client'

const globalForPrisma = globalThis as unknown as {
	prisma?: PrismaClient
}

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		adapter: new PrismaMariaDb(process.env.DATABASE_URL as string),
		log: ['error', 'warn'],
	})

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma
}
