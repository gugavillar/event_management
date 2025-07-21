import { z } from 'zod'

import { prisma } from '@/constants'

export const getRoomByEventId = async (
	id: string,
	searchName: string | null,
) => {
	try {
		z.object({
			id: z.uuid(),
			searchName: z.string().optional(),
		}).parse({ id, searchName })

		const rooms = await prisma.room.findMany({
			where: {
				eventId: id,
			},
			include: {
				members: {
					include: { participant: true, volunteer: true },
				},
				event: true,
			},
			orderBy: {
				roomNumber: 'asc',
			},
		})

		const filteredRooms = rooms.map((room) => {
			let members = room.members

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
				...room,
				members,
			}
		})

		return filteredRooms
	} catch (error) {
		console.error('@getRoomByEventId error:', error)
		throw Error
	}
}
