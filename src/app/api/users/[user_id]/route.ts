import type { NextRequest } from 'next/server'

import { getUserById } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		user_id?: string
	}>
}

const handleGet = async (_: NextRequest, { params }: Params) => {
	const routeParams = await params.then((res) => res.user_id ?? '')
	return await requestProcess({
		functions: async () => getUserById(routeParams),
	})
}

export { handleGet as GET }
