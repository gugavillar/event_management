import { z } from 'zod'

import { MEMBERS } from '@/constants'
import { prisma } from '@/lib/prisma'

export const updateRegistrationById = async (id: string, memberType: MEMBERS, action: 'open' | 'close') => {
	try {
		z.object({
			action: z.enum(['open', 'close']),
			id: z.uuid(),
			memberType: z.enum([MEMBERS.PARTICIPANT, MEMBERS.VOLUNTEER]),
		}).parse({ action, id, memberType })

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
