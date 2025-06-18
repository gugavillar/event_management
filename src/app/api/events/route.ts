import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

import { createEvent, getAllEvents } from '@/server'
import { FormEvent } from '@/services/queries/events/event.type'
import { requestProcess } from '@/utils/prisma'

import { authOptions } from '../auth/[...nextauth]/authOptions'

const handlerPost = async (request: NextRequest) => {
	const body: FormEvent = await request.json()
	const session = await getServerSession(authOptions)

	return await requestProcess({
		functions: async () => await createEvent(body, session?.user?.id as string),
		isProtectedRoute: true,
	})
}

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('searchEvent')
	const pageParams = Number(request.nextUrl.searchParams.get('pageEvent')) || 1

	return await requestProcess({
		functions: async () => await getAllEvents(searchParams, pageParams),
	})
}

export { handlerPost as POST, handlerGet as GET }
