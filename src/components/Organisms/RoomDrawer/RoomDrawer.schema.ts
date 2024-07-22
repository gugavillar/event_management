import { z } from 'zod'

import {
	CollaboratorTypeAPI,
	GenderTypeAPI,
	MAX_ROOM_NUMBER,
	MIN_ROOM_NUMBER,
	TrueOrFalseAPI,
	validateFieldsForNotEquals,
} from '@/constants'

export const RoomSchema = z
	.object({
		event: z
			.string({ required_error: 'Campo obrigatório' })
			.uuid({ message: 'Campo obrigatório' }),
		gender: z.enum(
			[GenderTypeAPI.MALE, GenderTypeAPI.FEMALE, GenderTypeAPI.BOTH],
			{
				required_error: 'Campo obrigatório',
				message: 'Campo obrigatório',
			},
		),
		type: z.enum(
			[CollaboratorTypeAPI.PARTICIPANT, CollaboratorTypeAPI.VOLUNTARY],
			{
				required_error: 'Campo obrigatório',
				message: 'Campo obrigatório',
			},
		),
		need: z
			.enum([TrueOrFalseAPI.TRUE, TrueOrFalseAPI.FALSE], {
				required_error: 'Campo obrigatório',
				message: 'Campo obrigatório',
			})
			.optional(),
		roomNumber: z
			.string({
				required_error: 'Campo obrigatório',
				message: 'Campo obrigatório',
			})
			.trim()
			.transform((value) => Number(value))
			.refine((value) => value >= MIN_ROOM_NUMBER && value <= MAX_ROOM_NUMBER, {
				message: `O número deve ser do ${String(MIN_ROOM_NUMBER).padStart(2, '0')} até o ${MAX_ROOM_NUMBER}`,
			}),
		leader: z
			.string({ required_error: 'Campo obrigatório' })
			.uuid({ message: 'Campo obrigatório' })
			.optional(),
		collaborators: z
			.array(
				z.object({
					selected: z
						.string({ required_error: 'Campo obrigatório' })
						.refine((value) => !!value?.length, {
							message: 'Campo obrigatório',
						}),
				}),
			)
			.superRefine((value, ctx) =>
				validateFieldsForNotEquals(
					value,
					ctx,
					'selected',
					'Os colaboradores devem ser diferentes',
				),
			),
	})
	.superRefine((value, ctx) => {
		if (value.type === CollaboratorTypeAPI.PARTICIPANT && !value.need) {
			return ctx.addIssue({
				code: 'custom',
				message: 'Selecione se é necessário líder',
				path: ['need'],
			})
		}
		if (value.need === TrueOrFalseAPI.TRUE && !value.leader) {
			return ctx.addIssue({
				code: 'custom',
				message: 'Selecione o líder do quarto',
				path: ['leader'],
			})
		}
		if (
			value.type === CollaboratorTypeAPI.PARTICIPANT &&
			value.need === TrueOrFalseAPI.TRUE &&
			(value.collaborators.length > 4 || value.collaborators.length < 3)
		) {
			return value.collaborators.forEach((_, index) => {
				ctx.addIssue({
					code: 'custom',
					path: [`collaborators.${index}.selected`],
					message: 'O quarto deve ter entre 3 e 4 colaboradores',
				})
			})
		}
		if (
			value.type === CollaboratorTypeAPI.PARTICIPANT &&
			value.need === TrueOrFalseAPI.FALSE &&
			(value.collaborators.length > 5 || value.collaborators.length < 3)
		) {
			value.collaborators.forEach((_, index) => {
				ctx.addIssue({
					code: 'custom',
					path: [`collaborators.${index}.selected`],
					message: 'O quarto deve ter entre 3 e 5 colaboradores',
				})
			})
		}
		if (
			value.type === CollaboratorTypeAPI.VOLUNTARY &&
			(value.collaborators.length > 5 || value.collaborators.length < 3)
		) {
			value.collaborators.forEach((_, index) => {
				ctx.addIssue({
					code: 'custom',
					path: [`collaborators.${index}.selected`],
					message: 'O quarto deve ter entre 3 e 5 colaboradores',
				})
			})
		}
	})

export type RoomSchemaType = z.infer<typeof RoomSchema>
