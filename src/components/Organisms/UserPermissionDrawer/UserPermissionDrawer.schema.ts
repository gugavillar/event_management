import z from 'zod'

export const userPermissionDrawerSchema = z
	.object({
		dashboard: z.boolean(),
		donations: z.boolean().optional(),
		events: z.boolean().optional(),
		groups: z.boolean().optional(),
		meetings: z.boolean().optional(),
		participants: z
			.object({
				interest: z.boolean().optional(),
				list: z.boolean().optional(),
				payment: z.boolean().optional(),
				picture: z.boolean().optional(),
			})
			.optional(),
		rooms: z.boolean().optional(),
		transactions: z.boolean().optional(),
		users: z.boolean().optional(),
		volunteers: z
			.object({
				functions: z.boolean().optional(),
				list: z.boolean().optional(),
				payment: z.boolean().optional(),
			})
			.optional(),
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
