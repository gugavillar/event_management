import { roomSchemaRoute } from '@/app/api/rooms/room.schema'
import { MEMBERS } from '@/constants'
import { prisma } from '@/lib/prisma'
import type { FormRoom } from '@/services/queries/rooms/rooms.types'

export const createRoom = async (data: FormRoom) => {
	try {
		roomSchemaRoute.parse({ ...data })

		return await prisma.$transaction(async (tx) => {
			const room = await tx.room.create({
				data: {
					eventId: data.eventId,
					roomNumber: data.roomNumber,
				},
			})
			await tx.roomMember.createMany({
				data: data.members.map((member) => ({
					roomId: room.id,
					type: member.type,
					...(member.type === MEMBERS.PARTICIPANT ? { participantId: member.member } : { volunteerId: member.member }),
				})),
			})
		})
	} catch (error) {
		console.error('@createRoom error:', error)
		throw Error
	}
}
