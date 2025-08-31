import { z } from 'zod'

import { PaymentTypeAPI } from '@/constants'

export const DonationSchema = z.object({
	eventId: z.string().trim().min(1, 'Campo obrigatório'),
	name: z
		.string({ error: 'Campo obrigatório' })
		.trim()
		.min(3, 'Campo obrigatório'),
	type: z.enum([PaymentTypeAPI.CARD, PaymentTypeAPI.CASH, PaymentTypeAPI.PIX]),
	value: z
		.string({
			error: 'Campo obrigatório',
		})
		.min(1, 'Campo obrigatório'),
})

export type DonationType = z.infer<typeof DonationSchema>
