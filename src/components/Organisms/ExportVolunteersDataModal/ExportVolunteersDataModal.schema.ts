import { z } from 'zod'

export const ExportVolunteersDataModalSchema = z.object({
	eventId: z.string().uuid({ message: 'Campo obrigatório' }),
})

export type ExportVolunteersDataModalType = z.infer<
	typeof ExportVolunteersDataModalSchema
>
