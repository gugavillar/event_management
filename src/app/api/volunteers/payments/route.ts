import { NextRequest } from 'next/server'

import { PaymentTypeAPI } from '@/constants'
import { getAllVolunteersPayments } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('searchVolunteer')
	const eventIdParams = request.nextUrl.searchParams.get('eventId')
	const paymentTypeParams = request.nextUrl.searchParams.get('paymentType')

	return await requestProcess({
		functions: async () =>
			await getAllVolunteersPayments(
				eventIdParams,
				searchParams,
				paymentTypeParams as (typeof PaymentTypeAPI)[keyof typeof PaymentTypeAPI],
			),
	})
}

export { handlerGet as GET }
