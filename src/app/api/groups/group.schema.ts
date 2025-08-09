import { z } from 'zod'

import { MAX_FIELD_LENGTH, MEMBERS } from '@/constants'

export const groupSchemaRoute = z.object({
	name: z.string().trim().min(3).max(MAX_FIELD_LENGTH),
	eventId: z.uuid(),
	members: z.array(
		z.object({
			type: z.enum([MEMBERS.PARTICIPANT, MEMBERS.VOLUNTEER]),
			member: z.uuid(),
		}),
	),
})

export type GroupSchemaRouteType = z.infer<typeof groupSchemaRoute>
