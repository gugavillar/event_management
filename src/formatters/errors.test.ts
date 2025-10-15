import { z } from 'zod'

import { formatZodValidationErrors } from './errors'

const schema = z.object({
	finalDate: z.iso.datetime(),
	initialDate: z.iso.datetime(),
	name: z.string().min(3),
})

const MOCKED_ERROR = schema.safeParse({
	finalDate: '',
	initialDate: '',
	name: '',
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
