import type { NextRequest } from 'next/server'

import { getUploadUrl } from '@/server'
import { requestProcess } from '@/utils/prisma'

type Params = {
	params: Promise<{
		participant_id?: string
	}>
}

const handleGet = async (_: NextRequest, { params }: Params) => {
	const routeParam = await params.then((res) => res.participant_id ?? '')

	return await requestProcess({
		functions: async () => await getUploadUrl(routeParam),
	})
}

export { handleGet as GET }
