import { z } from 'zod'

import { eventSchemaRoute } from '@/app/api/events/event.schema'
import { prisma } from '@/constants'
import type { FormEvent } from '@/services/queries/events/event.type'

export const updateEventById = async (data: FormEvent, id: string) => {
	try {
		eventSchemaRoute
			.extend({
				id: z.uuid(),
			})
			.parse({ ...data, id })

		return await prisma.event.update({
			data,
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@updateEventById error:', error)
		throw Error
	}
}
