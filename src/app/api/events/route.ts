import { NextRequest } from 'next/server'

import { createEvent, getAllEvents } from '@/server'
import { FormEvent } from '@/services/queries/events/event.type'
import { requestProcess } from '@/utils/prisma'

const handlerPost = async (request: NextRequest) => {
	const body: FormEvent = await request.json()
	// TODO: pegar id do usuário via next auth

	return await requestProcess({
		functions: async () =>
			await createEvent(body, '7b323ec3-5323-4636-856e-b0c1fcf6cabe'),
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
