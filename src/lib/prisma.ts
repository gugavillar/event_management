import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

import { PrismaClient } from '../../prisma/prisma/generate/prisma/client'

const adapter = new PrismaMariaDb({
	connectionLimit: 5,
	database: process.env.MYSQL_DATABASE,
	...(process.env.NODE_ENV !== 'development' && { host: process.env.MYSQL_HOST }),
	password: process.env.MYSQL_PASSWORD,
	user: process.env.MYSQL_USER,
})
const prisma = new PrismaClient({ adapter })

export { prisma }
