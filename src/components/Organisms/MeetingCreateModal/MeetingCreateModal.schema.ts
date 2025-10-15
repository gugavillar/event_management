import { z } from 'zod'

import { isValidateDate } from '@/formatters'

export const MeetingCreateModalSchema = z.object({
	date: z
		.string({ error: 'Campo obrigatório' })
		.refine((value) => !!value?.length, { message: 'Campo obrigatório' })
		.refine((value) => (/^\d{2}\/\d{2}\/\d{4}/g.test(value) ? isValidateDate(value) : false), {
			message: 'A data não é valida',
		}),
	eventId: z.uuid(),
	title: z.string({ error: 'Campo obrigatório' }).trim().min(3, 'Campo obrigatório'),
})

export type MeetingCreateModalType = z.infer<typeof MeetingCreateModalSchema>
