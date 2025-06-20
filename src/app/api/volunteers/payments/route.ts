import { NextRequest } from 'next/server'

import { PaymentTypeAPI } from '@/constants'
import { getAllVolunteersPayments } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('searchVolunteer')
	const eventIdParams = request.nextUrl.searchParams.get('eventId')
	const paymentTypeParams = request.nextUrl.searchParams.get('paymentType')
	const cityParams = request.nextUrl.searchParams.get('volunteerCity')
	const pageParams =
		Number(request.nextUrl.searchParams.get('pageVolunteerPayment')) || 1

	return await requestProcess({
		functions: async () =>
			await getAllVolunteersPayments(
				eventIdParams,
				searchParams,
				cityParams,
				paymentTypeParams as (typeof PaymentTypeAPI)[keyof typeof PaymentTypeAPI],
				pageParams,
			),
	})
}

export { handlerGet as GET }
