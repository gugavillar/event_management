import { type RefinementCtx } from 'zod'

export const MIN_CURRENCY_VALUE = 0.01
export const MAX_CURRENCY_VALUE = 999999.99
export const MAX_FIELD_LENGTH = 191

export const validateFieldsForNotEquals = <T>(
	value: Array<T>,
	ctx: RefinementCtx,
	keyOfArray: keyof T,
	errorMessage: string,
) => {
	const indices: Array<number> = []
	const stringArray = value.map((val) => val[keyOfArray])

	stringArray.forEach((value, i, array) => {
		array.forEach((val, index) => {
			if (val === value && index !== i) {
				indices.push(index)
				indices.push(i)
			}
		})
	})

	const duplicatesFields = new Set([...indices])

	if (duplicatesFields?.size) {
		duplicatesFields?.forEach((value) =>
			ctx.addIssue({
				code: 'custom',
				path: [`${value}.${keyOfArray as string}`],
				message: errorMessage,
			}),
		)
	}
}

export const validatePhonesNotEquals = (
	personPhone: string,
	value: Array<{ phone: string; field: string }>,
	ctx: RefinementCtx,
) => {
	value.forEach((value) => {
		if (value.phone === personPhone) {
			return ctx.addIssue({
				code: 'custom',
				path: [value.field],
				message: 'Telefone duplicado',
			})
		}
	})
	return false
}
