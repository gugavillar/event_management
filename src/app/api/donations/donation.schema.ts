import { z } from 'zod'

import {
	MAX_CURRENCY_VALUE,
	MAX_FIELD_LENGTH,
	MIN_CURRENCY_VALUE,
	PaymentTypeAPI,
} from '@/constants'

export const donationSchemaRoute = z.object({
	eventId: z.uuid(),
	name: z.string().trim().min(3).max(MAX_FIELD_LENGTH),
	type: z.enum([PaymentTypeAPI.CARD, PaymentTypeAPI.CASH, PaymentTypeAPI.PIX]),
	value: z.coerce.number().min(MIN_CURRENCY_VALUE).max(MAX_CURRENCY_VALUE),
})
