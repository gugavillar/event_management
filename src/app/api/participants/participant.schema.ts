import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { z } from 'zod'

import { MAX_FIELD_LENGTH } from '@/constants'

export const participantSchemaRoute = z.object({
	name: z.string().min(3).max(MAX_FIELD_LENGTH),
	email: z
		.string()
		.email()
		.refine((value) => validateEmail(value)),
	called: z.string().min(1).max(MAX_FIELD_LENGTH),
	birthdate: z.string().datetime({ precision: 3 }),
	contact: z.string().refine((value) => validatePhone(value)),
	maritalStatus: z.string().min(3).max(MAX_FIELD_LENGTH),
	street: z.string().min(3).max(MAX_FIELD_LENGTH),
	neighborhood: z.string().min(3).max(MAX_FIELD_LENGTH),
	number: z.string().min(3).max(MAX_FIELD_LENGTH),
	city: z.string().min(3).max(MAX_FIELD_LENGTH),
	state: z
		.string()
		.max(2)
		.refine((value) => validateUF(value)),
	parent: z.string().min(3).max(MAX_FIELD_LENGTH),
	contactParent: z.string().refine((value) => validatePhone(value)),
	relationship: z.string().min(3).max(MAX_FIELD_LENGTH),
	host: z.string().min(3).max(MAX_FIELD_LENGTH),
	contactHost: z.string().refine((value) => validatePhone(value)),
})
