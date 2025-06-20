import { z } from 'zod'

const uuidBooleanObject = z.record(z.string().uuid(), z.boolean())

const arrayOfUuidBooleanObjects = z.array(uuidBooleanObject)

export const meetingSchemaRoute = z.object({
	eventId: z.string().uuid(),
	title: z.string().min(3),
	date: z.string().datetime({ precision: 3 }),
})

export type MeetingSchemaRouteType = z.infer<typeof meetingSchemaRoute>

export const meetingPresenceRoute = z.object({
	meetingId: z.string().uuid(),
	presence: arrayOfUuidBooleanObjects,
	justification: arrayOfUuidBooleanObjects,
})

export type MeetingPresenceRouteType = z.infer<typeof meetingPresenceRoute>
