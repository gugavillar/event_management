import { z } from 'zod'

import { groupSchemaRoute } from '@/app/api/groups/group.schema'
import { MEMBERS } from '@/constants'
import { prisma } from '@/lib/prisma'
import type { FormGroup } from '@/services/queries/groups/groups.types'

export const updateGroupById = async (data: FormGroup, id: string) => {
	try {
		groupSchemaRoute
			.extend({
				id: z.uuid(),
			})
			.parse({ ...data, id })

		return await prisma.$transaction(async (tx) => {
			const group = await tx.group.update({
				data: {
					eventId: data.eventId,
					name: data.name,
				},
				where: {
					id,
				},
			})
			await tx.groupMember.deleteMany({ where: { groupId: id } })

			await tx.groupMember.createMany({
				data: data.members.map((member) => ({
					groupId: group.id,
					type: member.type,
					...(member.type === MEMBERS.PARTICIPANT ? { participantId: member.member } : { volunteerId: member.member }),
				})),
			})
		})
	} catch (error) {
		console.error('@updateGroupById error:', error)
		throw Error
	}
}
