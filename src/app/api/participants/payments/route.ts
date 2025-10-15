import type { NextRequest } from 'next/server'

import type { PaymentTypeAPI } from '@/constants'
import { createParticipantPayment, getAllParticipantsPayments } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('searchParticipant')
	const eventIdParams = request.nextUrl.searchParams.get('eventId')
	const paymentTypeParams = request.nextUrl.searchParams.get('paymentType')
	const cityParams = request.nextUrl.searchParams.get('participantCity')
	const pageParams = Number(request.nextUrl.searchParams.get('pageParticipantPayment')) || 1

	return await requestProcess({
		functions: async () =>
			await getAllParticipantsPayments(
				eventIdParams,
				searchParams,
				cityParams,
				paymentTypeParams as (typeof PaymentTypeAPI)[keyof typeof PaymentTypeAPI],
				pageParams
			),
	})
}

const handlePost = async (request: NextRequest) => {
	const body = await request.json()
	return await requestProcess({
		functions: async () => await createParticipantPayment(body),
		isProtectedRoute: true,
	})
}

export { handlerGet as GET, handlePost as POST }
