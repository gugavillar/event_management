import { z } from 'zod'

import { MEMBERS } from '@/constants'

export const roomSchemaRoute = z.object({
	roomNumber: z.string().min(1).max(2),
	eventId: z.uuid(),
	members: z.array(
		z.object({
			type: z.enum([MEMBERS.PARTICIPANT, MEMBERS.VOLUNTEER]),
			member: z.uuid(),
		}),
	),
})

export type RoomSchemaRouteType = z.infer<typeof roomSchemaRoute>
