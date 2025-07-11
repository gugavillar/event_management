import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { resetUserPassword } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		user_id?: string
	}>
}

const handleUpdate = async (request: NextRequest, { params }: Params) => {
	const session = await getServerSession(authOptions)
	const routeParam = await params.then((res) => res.user_id ?? '')

	return await requestProcess({
		functions: async () =>
			await resetUserPassword(routeParam, session?.user?.id as string),
		isProtectedRoute: true,
	})
}

export { handleUpdate as PATCH }
