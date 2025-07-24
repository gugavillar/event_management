import { NextRequest } from 'next/server'

import { removeDonationById } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		donation_id?: string
	}>
}

const handleDelete = async (_: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.donation_id ?? '')
	return await requestProcess({
		functions: async () => removeDonationById(routeParams),
		isProtectedRoute: true,
	})
}

export { handleDelete as DELETE }
