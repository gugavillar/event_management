import { ZodError } from 'zod'

export const formatZodValidationErrors = (errors: ZodError['issues']) =>
	Object.fromEntries(errors.map(({ path, message }) => [path[0], message]))
