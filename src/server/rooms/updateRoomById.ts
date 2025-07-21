import { z } from 'zod'

import { roomSchemaRoute } from '@/app/api/rooms/room.schema'
import { MEMBERS, prisma } from '@/constants'
import { FormRoom } from '@/services/queries/rooms/rooms.types'

export const updateRoomById = async (data: FormRoom, id: string) => {
	try {
		roomSchemaRoute
			.extend({
				id: z.uuid(),
			})
			.parse({ ...data, id })

		return await prisma.$transaction(async (tx) => {
			const room = await tx.room.update({
				data: {
					roomNumber: data.roomNumber,
					eventId: data.eventId,
				},
				where: {
					id,
				},
			})
			await tx.roomMember.deleteMany({ where: { roomId: id } })

			await tx.roomMember.createMany({
				data: data.members.map((member: any) => ({
					type: member.type,
					roomId: room.id,
					...(member.type === MEMBERS.PARTICIPANT
						? { participantId: member.member }
						: { volunteerId: member.member }),
				})),
			})
		})
	} catch (error) {
		console.error('@updateRoomById error:', error)
		throw Error
	}
}
