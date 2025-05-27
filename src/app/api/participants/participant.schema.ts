import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { z } from 'zod'

import { MAX_FIELD_LENGTH } from '@/constants'

export const participantSchemaRoute = z.object({
	name: z.string().min(3).max(MAX_FIELD_LENGTH),
	called: z.string().min(1).max(MAX_FIELD_LENGTH),
	email: z
		.string()
		.email()
		.refine((value) => validateEmail(value)),
	phone: z.string().refine((value) => validatePhone(value)),
	birthdate: z.string().datetime({ precision: 3 }),
	responsible: z.string().min(3).max(MAX_FIELD_LENGTH),
	responsiblePhone: z.string().refine((value) => validatePhone(value)),
	religion: z.string().optional(),
	health: z.string().optional(),
	host: z.string().min(3).max(MAX_FIELD_LENGTH),
	hostPhone: z.string().refine((value) => validatePhone(value)),
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

export type ParticipantSchemaRouteType = z.infer<typeof participantSchemaRoute>
