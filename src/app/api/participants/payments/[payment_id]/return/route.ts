import { NextRequest } from 'next/server'

import { returnPaymentParticipant } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		payment_id?: string
	}>
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const body = await request.json()
	const routeParam = await params.then((res) => res.payment_id ?? '')

	return await requestProcess({
		functions: async () =>
			await returnPaymentParticipant({
				paymentId: routeParam,
				values: body,
			}),
		isProtectedRoute: true,
	})
}

export { handleUpdate as PATCH }
