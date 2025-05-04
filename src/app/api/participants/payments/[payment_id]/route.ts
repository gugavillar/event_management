import { NextRequest } from 'next/server'

import { updateParticipantPaymentById } from '@/server'
import { requestProcess } from '@/utils/prisma'

const handleUpdate = async (
	request: NextRequest,
	{ params }: { params: { payment_id: string } },
) => {
	const body = await request.json()

	return await requestProcess({
		functions: async () =>
			await updateParticipantPaymentById({
				paymentId: params.payment_id,
				values: body,
			}),
	})
}

export { handleUpdate as PATCH }
