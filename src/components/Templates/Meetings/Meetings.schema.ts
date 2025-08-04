import { z } from 'zod'

const uuidBooleanObject = z.record(z.uuid(), z.boolean())

const arrayOfUuidBooleanObjects = z.array(uuidBooleanObject)

export const MeetingSchema = z
	.object({
		presence: arrayOfUuidBooleanObjects,
		justification: arrayOfUuidBooleanObjects,
	})
	.superRefine((data, ctx) => {
		const flattenArray = (arr: Array<Record<string, boolean>>) => {
			const result: Record<string, boolean> = {}
			arr.forEach((obj) => {
				Object.entries(obj).forEach(([k, v]) => {
					result[k] = v
				})
			})
			return result
		}

		const presenceFlat = flattenArray(data.presence)
		const justificationFlat = flattenArray(data.justification)

		for (const uuid in presenceFlat) {
			if (presenceFlat[uuid] && justificationFlat[uuid]) {
				const presenceIndex = data.presence.findIndex((obj) => uuid in obj)
				const justificationIndex = data.justification.findIndex(
					(obj) => uuid in obj,
				)

				if (presenceIndex !== -1) {
					ctx.addIssue({
						path: ['presence', presenceIndex, uuid],
						message: 'Apenas uma opção.',
						code: 'custom',
					})
				}

				if (justificationIndex !== -1) {
					ctx.addIssue({
						path: ['justification', justificationIndex, uuid],
						message: 'Apenas uma opção.',
						code: 'custom',
					})
				}
			}
		}
	})

export type MeetingSchemaType = z.infer<typeof MeetingSchema>
