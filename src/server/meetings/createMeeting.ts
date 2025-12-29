import { type MeetingSchemaRouteType, meetingSchemaRoute } from '@/app/api/meetings/meeting.schema'
import { prisma } from '@/lib/prisma'

export const createMeeting = async (data: MeetingSchemaRouteType) => {
	try {
		meetingSchemaRoute.parse({ ...data })

		return await prisma.meetings.create({
			data,
		})
	} catch (error) {
		console.error('@createMeeting error:', error)
		throw Error
	}
}
