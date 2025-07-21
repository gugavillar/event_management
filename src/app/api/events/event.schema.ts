import { z } from 'zod'

import {
	GenderTypeAPI,
	MAX_FIELD_LENGTH,
	MAX_CURRENCY_VALUE,
	MIN_CURRENCY_VALUE,
} from '@/constants'

export const eventSchemaRoute = z.object({
	name: z.string().min(3).max(MAX_FIELD_LENGTH),
	gender: z.enum([
		GenderTypeAPI.MALE,
		GenderTypeAPI.FEMALE,
		GenderTypeAPI.BOTH,
	]),
	initialDate: z.iso.datetime({ precision: 3 }),
	finalDate: z.iso.datetime({ precision: 3 }),
	participantPrice: z.coerce
		.number()
		.min(MIN_CURRENCY_VALUE)
		.max(MAX_CURRENCY_VALUE),
	volunteerPrice: z.coerce
		.number()
		.min(MIN_CURRENCY_VALUE)
		.max(MAX_CURRENCY_VALUE),
})

export type EventSchemaRouteType = z.infer<typeof eventSchemaRoute>
