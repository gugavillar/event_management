import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/constants'

export const updateInterestedListById = async (
	id: string,
	action: 'open' | 'close',
) => {
	try {
		z.object({
			id: z.string().uuid(),
			action: z.enum(['open', 'close']),
		}).parse({ id, action })

		const event = await prisma.event.findUnique({
			where: {
				id,
			},
		})

		if (event?.isParticipantRegistrationOpen && action === 'open') {
			return NextResponse.json(
				{
					error:
						'Para abrir a lista de interessados, primeiro feche a inscrição de participantes',
				},
				{ status: 400 },
			)
		}

		return await prisma.event.update({
			data: {
				isInterestedListOpen: action === 'open',
			},
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@updateInterestedListById error:', error)
		throw Error
	}
}
