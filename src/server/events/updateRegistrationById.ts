import { z } from 'zod'

import { MEMBERS, prisma } from '@/constants'

export const updateRegistrationById = async (
	id: string,
	memberType: MEMBERS,
	action: 'open' | 'close',
) => {
	try {
		z.object({
			id: z.uuid(),
			memberType: z.enum([MEMBERS.PARTICIPANT, MEMBERS.VOLUNTEER]),
			action: z.enum(['open', 'close']),
		}).parse({ id, memberType, action })

		return await prisma.event.update({
			data: {
				...(memberType === MEMBERS.PARTICIPANT
					? { isParticipantRegistrationOpen: action === 'open' }
					: { isVolunteerRegistrationOpen: action === 'open' }),
			},
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@updateRegistrationById error:', error)
		throw Error
	}
}
