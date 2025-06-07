import { z } from 'zod'

import { groupSchemaRoute } from '@/app/api/groups/group.schema'
import { MEMBERS, prisma } from '@/constants'
import { FormGroup } from '@/services/queries/groups/groups.types'

export const updateGroupById = async (data: FormGroup, id: string) => {
	try {
		groupSchemaRoute
			.extend({
				id: z.string().uuid(),
			})
			.parse({ ...data, id })

		return await prisma.$transaction(async (tx) => {
			const group = await tx.group.update({
				data: {
					name: data.name,
					eventId: data.eventId,
				},
				where: {
					id,
				},
			})
			await tx.groupMember.deleteMany({ where: { groupId: id } })

			await tx.groupMember.createMany({
				data: data.members.map((member) => ({
					type: member.type,
					groupId: group.id,
					...(member.type === MEMBERS.PARTICIPANT
						? { participantId: member.member }
						: { volunteerId: member.member }),
				})),
			})
		})
	} catch (error) {
		console.error('@updateGroupById error:', error)
		throw Error
	}
}
