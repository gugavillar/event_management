import { NextResponse } from 'next/server'
import { z } from 'zod'

import { CHECK_IN_STATUS, prisma } from '@/constants'

export const getMeetingById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.$transaction(async (tx) => {
			const meeting = await tx.meetings.findUnique({
				where: {
					id,
				},
			})

			if (!meeting) {
				return NextResponse.json({ error: 'Reunião não encontrada' }, { status: 400 })
			}

			const volunteers = await tx.volunteer.findMany({
				orderBy: {
					name: 'asc',
				},
				select: {
					id: true,
					name: true,
				},
				where: {
					eventId: meeting.eventId,
					OR: [{ checkIn: null }, { checkIn: { not: CHECK_IN_STATUS.WITHDREW } }],
				},
			})

			return {
				meeting,
				volunteers,
			}
		})
	} catch (error) {
		console.error('@getMeetingById error:', error)
		throw Error
	}
}
