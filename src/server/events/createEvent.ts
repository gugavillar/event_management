import { z } from 'zod'

import { eventSchemaRoute } from '@/app/api/events/event.schema'
import { prisma } from '@/constants'
import type { FormEvent } from '@/services/queries/events/event.type'

export const createEvent = (data: FormEvent, userId: string) => {
	try {
		eventSchemaRoute
			.extend({
				userId: z.uuid(),
			})
			.parse({ ...data, userId })

		return prisma.event.create({
			data: { ...data, userId },
		})
	} catch (error) {
		console.error('@createEvent error:', error)
		throw Error
	}
}
