import { NextRequest } from 'next/server'

import { removeTransactionById } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		transaction_id?: string
	}>
}

const handleDelete = async (_: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.transaction_id ?? '')
	return await requestProcess({
		functions: async () => removeTransactionById(routeParams),
		isProtectedRoute: true,
	})
}

export { handleDelete as DELETE }
