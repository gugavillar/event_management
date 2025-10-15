import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

import type { UserSchemaType } from '@/components/Organisms/UserDrawer/UserDrawer.schema'
import { createUser, getAllUsers, updateUserPassword } from '@/server'
import { requestProcess } from '@/utils/prisma'

import { authOptions } from '../auth/[...nextauth]/authOptions'

const handlerPost = async (request: NextRequest) => {
	const body: UserSchemaType = await request.json()

	return await requestProcess({
		functions: async () => await createUser(body),
		isProtectedRoute: true,
	})
}

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('searchUser')
	const pageParams = Number(request.nextUrl.searchParams.get('pageUser')) || 1

	return await requestProcess({
		functions: async () => await getAllUsers(searchParams, pageParams),
		isProtectedRoute: true,
	})
}

const handleUpdate = async (request: NextRequest) => {
	const session = await getServerSession(authOptions)
	const body: { password: string } = await request.json()

	return await requestProcess({
		functions: async () => await updateUserPassword(session?.user?.id as string, body.password),
	})
}

export { handlerPost as POST, handlerGet as GET, handleUpdate as PATCH }
