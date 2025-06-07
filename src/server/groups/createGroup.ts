import { groupSchemaRoute } from '@/app/api/groups/group.schema'
import { MEMBERS, prisma } from '@/constants'
import { FormGroup } from '@/services/queries/groups/groups.types'

export const createGroup = async (data: FormGroup) => {
	try {
		groupSchemaRoute.parse({ ...data })

		return await prisma.$transaction(async (tx) => {
			const group = await tx.group.create({
				data: {
					name: data.name,
					eventId: data.eventId,
				},
			})
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
		console.error('@createGroup error:', error)
		throw Error
	}
}
