import { z } from 'zod'

import { MAX_FIELD_LENGTH, MEMBERS } from '@/constants'

export const groupSchemaRoute = z.object({
	eventId: z.uuid(),
	members: z.array(
		z.object({
			member: z.uuid(),
			type: z.enum([MEMBERS.PARTICIPANT, MEMBERS.VOLUNTEER]),
		})
	),
	name: z.string().trim().min(3).max(MAX_FIELD_LENGTH),
})

export type GroupSchemaRouteType = z.infer<typeof groupSchemaRoute>
