import { groupSchemaRoute } from '@/app/api/groups/group.schema'
import { MEMBERS } from '@/constants'
import { prisma } from '@/lib/prisma'
import type { FormGroup } from '@/services/queries/groups/groups.types'

export const createGroup = async (data: FormGroup) => {
	try {
		groupSchemaRoute.parse({ ...data })

		return await prisma.$transaction(async (tx) => {
			const group = await tx.group.create({
				data: {
					eventId: data.eventId,
					name: data.name,
				},
			})
			await tx.groupMember.createMany({
				data: data.members.map((member) => ({
					groupId: group.id,
					type: member.type,
					...(member.type === MEMBERS.PARTICIPANT ? { participantId: member.member } : { volunteerId: member.member }),
				})),
			})
		})
	} catch (error) {
		console.error('@createGroup error:', error)
		throw Error
	}
}
