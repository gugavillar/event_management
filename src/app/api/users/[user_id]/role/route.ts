import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { ROLES } from '@/constants'
import { updateUserRole } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleUpdate = async (
	request: NextRequest,
	{ params }: { params: { user_id: string } },
) => {
	const session = await getServerSession(authOptions)
	const body: { role: ROLES } = await request.json()

	return await requestProcess({
		functions: async () =>
			await updateUserRole(
				params.user_id,
				body.role,
				session?.user?.id as string,
			),
		isProtectedRoute: true,
	})
}

export { handleUpdate as PATCH }
