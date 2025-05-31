import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { z } from 'zod'

import { MAX_FIELD_LENGTH } from '@/constants'

export const volunteerSchemaRoute = z.object({
	name: z.string().min(3).max(MAX_FIELD_LENGTH),
	called: z.string().min(1).max(MAX_FIELD_LENGTH),
	email: z
		.string()
		.email()
		.refine((value) => validateEmail(value)),
	phone: z.string().refine((value) => validatePhone(value)),
	birthdate: z.string().datetime({ precision: 3 }),
	relative: z.string().min(3).max(MAX_FIELD_LENGTH),
	relativePhone: z.string().refine((value) => validatePhone(value)),
	cell: z.string().optional(),
	health: z.string().optional(),
	community: z.string().min(3).max(MAX_FIELD_LENGTH),
	address: z.object({
		street: z.string().min(3).max(MAX_FIELD_LENGTH),
		neighborhood: z.string().min(3).max(MAX_FIELD_LENGTH),
		number: z.string().min(1).max(MAX_FIELD_LENGTH),
		city: z.string().min(3).max(MAX_FIELD_LENGTH),
		state: z
			.string()
			.max(2)
			.refine((value) => validateUF(value)),
	}),
})

export type VolunteerSchemaRouteType = z.infer<typeof volunteerSchemaRoute>
