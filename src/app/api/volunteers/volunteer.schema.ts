import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { z } from 'zod'

import { MAX_FIELD_LENGTH } from '@/constants'

export const volunteerSchemaRoute = z.object({
	name: z.string().trim().min(3).max(MAX_FIELD_LENGTH),
	called: z.string().trim().min(1).max(MAX_FIELD_LENGTH),
	email: z
		.email()
		.trim()
		.refine((value) => validateEmail(value)),
	phone: z
		.string()
		.trim()
		.refine((value) => validatePhone(value)),
	birthdate: z.iso.datetime({ precision: 3 }),
	relative: z.string().trim().min(3).max(MAX_FIELD_LENGTH),
	relativePhone: z
		.string()
		.trim()
		.refine((value) => validatePhone(value)),
	cell: z.string().trim().nullable().optional(),
	health: z.string().trim().nullable().optional(),
	community: z.string().trim().min(3).max(MAX_FIELD_LENGTH),
	address: z.object({
		street: z.string().trim().min(3).max(MAX_FIELD_LENGTH),
		neighborhood: z.string().trim().min(3).max(MAX_FIELD_LENGTH),
		number: z.string().trim().min(1).max(MAX_FIELD_LENGTH),
		city: z.string().trim().min(3).max(MAX_FIELD_LENGTH),
		state: z
			.string()
			.trim()
			.max(2)
			.refine((value) => validateUF(value)),
	}),
})

export type VolunteerSchemaRouteType = z.infer<typeof volunteerSchemaRoute>
