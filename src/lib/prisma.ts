import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

import { IS_NOT_DEVELOPMENT } from '@/constants'

import { PrismaClient } from '../../prisma/prisma/generate/prisma/client'

const adapter = new PrismaMariaDb(
	IS_NOT_DEVELOPMENT
		? {
				connectionLimit: 5,
				database: process.env.MYSQL_DATABASE,
				host: process.env.MYSQL_HOST,
				password: process.env.MYSQL_PASSWORD,
				user: process.env.MYSQL_USER,
			}
		: (process.env.DATABASE_URL as string)
)
const prisma = new PrismaClient({ adapter })

export { prisma }
