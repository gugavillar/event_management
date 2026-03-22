import z from 'zod'

export const userPermissionDrawerSchema = z
	.object({
		dashboard: z.boolean(),
		donations: z.boolean(),
		events: z.boolean(),
		groups: z.boolean(),
		meetings: z.boolean(),
		participants: z.object({
			interest: z.boolean(),
			list: z.boolean(),
			payment: z.boolean(),
			picture: z.boolean(),
		}),
		rooms: z.boolean(),
		transactions: z.boolean(),
		users: z.boolean(),
		volunteers: z.object({
			functions: z.boolean(),
			list: z.boolean(),
			payment: z.boolean(),
		}),
	})
	.refine((data) => {
		const hasAtLeastOnePermission = Object.values(data).some((value) => {
			if (typeof value === 'boolean') {
				return value
			} else if (typeof value === 'object') {
				return Object.values(value).some((subValue) => subValue === true)
			}
			return false
		})
		return hasAtLeastOnePermission
	})

export type UserPermissionDrawerType = z.infer<typeof userPermissionDrawerSchema>
