import type { NextRequest } from 'next/server'

import { createTransaction, getTransactions } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerPost = async (request: NextRequest) => {
	const data = await request.json()

	return await requestProcess({
		functions: async () => await createTransaction(data),
		isProtectedRoute: true,
	})
}

const handlerGet = async (request: NextRequest) => {
	const eventId = request.nextUrl.searchParams.get('eventId')
	const searchTransaction = request.nextUrl.searchParams.get('searchTransaction')
	const pageParams = Number(request.nextUrl.searchParams.get('page')) || 1

	return await requestProcess({
		functions: async () => await getTransactions(eventId, searchTransaction, pageParams),
		isProtectedRoute: true,
	})
}

export { handlerPost as POST, handlerGet as GET }
