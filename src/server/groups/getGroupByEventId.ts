import { z } from 'zod'

import { prisma } from '@/constants'

export const getGroupByEventId = async (
	id: string,
	searchName: string | null,
) => {
	try {
		z.object({
			id: z.uuid(),
			searchName: z.string().optional(),
		}).parse({ id, searchName })

		const groups = await prisma.group.findMany({
			where: {
				eventId: id,
			},
			include: {
				members: {
					include: {
						participant: { include: { address: true, event: true } },
						volunteer: { include: { address: true, event: true } },
					},
				},
				event: true,
			},
			orderBy: {
				name: 'asc',
			},
		})

		const filteredGroups = groups.map((group) => {
			let members = group.members

			if (searchName) {
				const nameLower = searchName.toLowerCase()
				members = members.filter((member) => {
					const name = member.participant?.name || member.volunteer?.name || ''
					return name.toLowerCase().includes(nameLower)
				})
			}

			members = members.sort((a, b) => {
				const nameA = a.participant?.name || a.volunteer?.name || ''
				const nameB = b.participant?.name || b.volunteer?.name || ''
				return nameA.localeCompare(nameB)
			})

			return {
				...group,
				members,
			}
		})

		return filteredGroups
	} catch (error) {
		console.error('@getGroupByEventId error:', error)
		throw Error
	}
}
