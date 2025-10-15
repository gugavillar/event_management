import type { NextRequest } from 'next/server'

import { returnPaymentVolunteer } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		payment_id?: string
	}>
}

const handleDelete = async (_: NextRequest, { params }: Params) => {
	const routeParam = await params.then((res) => res.payment_id ?? '')
	return await requestProcess({
		functions: async () => await returnPaymentVolunteer(routeParam),
		isProtectedRoute: true,
	})
}

export { handleDelete as DELETE }
