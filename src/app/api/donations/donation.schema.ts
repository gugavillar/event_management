import { z } from 'zod'

import {
	MAX_CURRENCY_VALUE,
	MAX_FIELD_LENGTH,
	MIN_CURRENCY_VALUE,
} from '@/constants'

export const donationSchemaRoute = z.object({
	name: z.string().trim().min(3).max(MAX_FIELD_LENGTH),
	eventId: z.uuid(),
	value: z.coerce.number().min(MIN_CURRENCY_VALUE).max(MAX_CURRENCY_VALUE),
})
