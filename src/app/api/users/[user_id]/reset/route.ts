import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { resetUserPassword } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleUpdate = async (
	request: NextRequest,
	{ params }: { params: { user_id: string } },
) => {
	const session = await getServerSession(authOptions)

	return await requestProcess({
		functions: async () =>
			await resetUserPassword(params.user_id, session?.user?.id as string),
		isProtectedRoute: true,
	})
}

export { handleUpdate as PATCH }
