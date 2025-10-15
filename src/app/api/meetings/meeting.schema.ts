import { z } from 'zod'

const uuidBooleanObject = z.record(z.uuid(), z.boolean())

const arrayOfUuidBooleanObjects = z.array(uuidBooleanObject)

export const meetingSchemaRoute = z.object({
	date: z.iso.datetime({ precision: 3 }),
	eventId: z.uuid(),
	title: z.string().trim().min(3),
})

export type MeetingSchemaRouteType = z.infer<typeof meetingSchemaRoute>

export const meetingPresenceRoute = z.object({
	justification: arrayOfUuidBooleanObjects,
	meetingId: z.uuid(),
	presence: arrayOfUuidBooleanObjects,
})

export type MeetingPresenceRouteType = z.infer<typeof meetingPresenceRoute>
