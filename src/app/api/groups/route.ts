import { NextRequest } from 'next/server'

import { createGroup } from '@/server'
import { FormGroup } from '@/services/queries/groups/groups.types'
import { requestProcess } from '@/utils/prisma'

const handlerPost = async (request: NextRequest) => {
	const body: FormGroup = await request.json()

	return await requestProcess({
		functions: async () => await createGroup(body),
	})
}

export { handlerPost as POST }
