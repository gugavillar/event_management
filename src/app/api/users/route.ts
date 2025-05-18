import { NextRequest } from 'next/server'

import { UserSchemaType } from '@/components/Organisms/UserDrawer/UserDrawer.schema'
import { createUser, getAllUsers } from '@/server'
import { requestProcess } from '@/utils/prisma'

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

export { handlerPost as POST, handlerGet as GET }
