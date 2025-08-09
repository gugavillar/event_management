import { z } from 'zod'

const uuidBooleanObject = z.record(z.uuid(), z.boolean())

const arrayOfUuidBooleanObjects = z.array(uuidBooleanObject)

export const meetingSchemaRoute = z.object({
	eventId: z.uuid(),
	title: z.string().trim().min(3),
	date: z.iso.datetime({ precision: 3 }),
})

export type MeetingSchemaRouteType = z.infer<typeof meetingSchemaRoute>

export const meetingPresenceRoute = z.object({
	meetingId: z.uuid(),
	presence: arrayOfUuidBooleanObjects,
	justification: arrayOfUuidBooleanObjects,
})

export type MeetingPresenceRouteType = z.infer<typeof meetingPresenceRoute>
