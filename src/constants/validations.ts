import { type RefinementCtx } from 'zod'

export const MIN_CURRENCY_VALUE = 0.01
export const MAX_CURRENCY_VALUE = 999999.99
export const MAX_FIELD_LENGTH = 255
export const MIN_ROOM_NUMBER = 1
export const MAX_ROOM_NUMBER = 32

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
