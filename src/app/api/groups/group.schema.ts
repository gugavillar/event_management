import { z } from 'zod'

import { MAX_FIELD_LENGTH, MEMBERS } from '@/constants'

export const groupSchemaRoute = z.object({
	name: z.string().min(3).max(MAX_FIELD_LENGTH),
	eventId: z.string().uuid(),
	members: z.array(
		z.object({
			type: z.enum([MEMBERS.PARTICIPANT, MEMBERS.VOLUNTEER]),
			member: z.string().uuid(),
		}),
	),
})

export type GroupSchemaRouteType = z.infer<typeof groupSchemaRoute>
