import { ZodIssue } from 'zod'

export const formatZodValidationErrors = (errors: ZodIssue[]) =>
	Object.fromEntries(errors.map(({ path, message }) => [path[0], message]))
