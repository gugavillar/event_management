import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

import { PrismaClient } from '../../prisma/prisma/generate/prisma/client'

const globalForPrisma = globalThis as unknown as {
	prisma?: PrismaClient
}

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string)

const prisma = new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma
}

export { prisma }
