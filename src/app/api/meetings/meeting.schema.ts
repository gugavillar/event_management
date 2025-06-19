import { z } from 'zod'

export const meetingSchemaRoute = z.object({
	eventId: z.string().uuid(),
	title: z.string().min(3),
	date: z.string().datetime({ precision: 3 }),
})

export type MeetingSchemaRouteType = z.infer<typeof meetingSchemaRoute>
