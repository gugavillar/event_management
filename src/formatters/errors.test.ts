import { z } from 'zod'

import { formatZodValidationErrors } from './errors'

const schema = z.object({
	name: z.string().min(3),
	initialDate: z.iso.datetime(),
	finalDate: z.iso.datetime(),
})

const MOCKED_ERROR = schema.safeParse({
	name: '',
	initialDate: '',
	finalDate: '',
})

describe('errors formatters', () => {
	it('formats zod errors into an object with field names as keys and messages as values', () => {
		if (!MOCKED_ERROR.success) {
			const result = formatZodValidationErrors(MOCKED_ERROR.error.issues)

			expect(result).toEqual({
				finalDate: 'Invalid ISO datetime',
				initialDate: 'Invalid ISO datetime',
				name: 'Too small: expected string to have >=3 characters',
			})
		} else {
			throw new Error('Expected parsing to fail')
		}
	})
})
