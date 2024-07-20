import { ZodIssue } from 'zod'

import { formatZodValidationErrors } from './errors'

const MOCKED_ERROR: ZodIssue[] = [
	{
		code: 'too_small',
		minimum: 3,
		type: 'string',
		inclusive: true,
		exact: false,
		message: 'String must contain at least 3 character(s)',
		path: ['name'],
	},
	{
		code: 'invalid_string',
		validation: 'datetime',
		message: 'Invalid datetime',
		path: ['initialDate'],
	},
	{
		code: 'invalid_string',
		validation: 'datetime',
		message: 'Invalid datetime',
		path: ['finalDate'],
	},
]

describe('errors formatters', () => {
	it('it format zod errors return object with key field name and value message', () => {
		const result = formatZodValidationErrors(MOCKED_ERROR)

		expect(result).toEqual({
			name: 'String must contain at least 3 character(s)',
			initialDate: 'Invalid datetime',
			finalDate: 'Invalid datetime',
		})
	})
})
