import { z } from 'zod'

import { MEMBERS } from '@/constants'

export const roomSchemaRoute = z.object({
	eventId: z.uuid(),
	members: z.array(
		z.object({
			member: z.uuid(),
			type: z.enum([MEMBERS.PARTICIPANT, MEMBERS.VOLUNTEER]),
		})
	),
	roomNumber: z.string().trim().min(1).max(2),
})

export type RoomSchemaRouteType = z.infer<typeof roomSchemaRoute>
