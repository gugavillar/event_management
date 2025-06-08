import { roomSchemaRoute } from '@/app/api/rooms/room.schema'
import { MEMBERS, prisma } from '@/constants'
import { FormRoom } from '@/services/queries/rooms/rooms.types'

export const createRoom = async (data: FormRoom) => {
	try {
		roomSchemaRoute.parse({ ...data })

		return await prisma.$transaction(async (tx) => {
			const room = await tx.room.create({
				data: {
					roomNumber: data.roomNumber,
					eventId: data.eventId,
				},
			})
			await tx.roomMember.createMany({
				data: data.members.map((member) => ({
					type: member.type,
					roomId: room.id,
					...(member.type === MEMBERS.PARTICIPANT
						? { participantId: member.member }
						: { volunteerId: member.member }),
				})),
			})
		})
	} catch (error) {
		console.error('@createRoom error:', error)
		throw Error
	}
}
