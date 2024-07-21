import { z } from 'zod'

const validateFieldsForNotEquals = (
	value: Array<{ selected: string }>,
	ctx: z.RefinementCtx,
) => {
	const indices: Array<number> = []
	const stringArray = value.map((val) => val.selected)

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
				path: [`${value}.selected`],
				message: 'Os participantes devem ser diferentes',
			}),
		)
	}
}

export const GroupSchema = z.object({
	name: z
		.string({ required_error: 'Campo obrigatório' })
		.trim()
		.min(3, 'Campo obrigatório'),
	event: z
		.string({ required_error: 'Campo obrigatório' })
		.uuid({ message: 'Campo obrigatório' }),
	leader: z
		.string({ required_error: 'Campo obrigatório' })
		.trim()
		.min(3, 'Campo obrigatório'),
	participants: z
		.array(
			z.object({
				selected: z
					.string({ required_error: 'Campo obrigatório' })
					.refine((value) => !!value?.length, { message: 'Campo obrigatório' }),
			}),
		)
		.superRefine((value, ctx) => validateFieldsForNotEquals(value, ctx)),
})

export type GroupSchemaType = z.infer<typeof GroupSchema>
