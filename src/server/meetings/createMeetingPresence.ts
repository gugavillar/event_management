import {
	type MeetingPresenceRouteType,
	meetingPresenceRoute,
} from '@/app/api/meetings/meeting.schema'
import { prisma } from '@/constants'

type AttendanceInput = {
	presence: Array<Record<string, boolean>>
	justification: Array<Record<string, boolean>>
	meetingId: string
}

type NormalizedAttendance = {
	volunteerId: string
	meetingId: string
	presence: boolean
	justification: boolean
}

export const normalizeAttendanceData = (
	input: AttendanceInput
): NormalizedAttendance[] => {
	const { presence, justification, meetingId } = input

	const result: Record<string, NormalizedAttendance> = {}

	for (const item of presence) {
		const [volunteerId, isPresent] = Object.entries(item)[0]
		result[volunteerId] = {
			justification: false,
			meetingId,
			presence: isPresent,
			volunteerId,
		}
	}

	for (const item of justification) {
		const [volunteerId, isJustified] = Object.entries(item)[0]
		if (!result[volunteerId]) {
			result[volunteerId] = {
				justification: isJustified,
				meetingId,
				presence: false,
				volunteerId,
			}
		} else {
			result[volunteerId].justification = isJustified
		}
	}

	return Object.values(result)
}

export const createMeetingPresence = async (
	data: MeetingPresenceRouteType,
	updatePresence: boolean
) => {
	try {
		meetingPresenceRoute.parse({ ...data })

		const normalizedData = normalizeAttendanceData(data)

		if (updatePresence) {
			await prisma.meetingPresence.deleteMany({
				where: {
					meetingId: data.meetingId,
				},
			})
		}

		return await prisma.meetingPresence.createMany({
			data: normalizedData,
		})
	} catch (error) {
		console.error('@createMeetingPresence error:', error)
		throw Error
	}
}
