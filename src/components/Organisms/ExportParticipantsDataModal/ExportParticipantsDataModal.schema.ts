import { z } from 'zod'

export const ExportParticipantsFileModalSchema = z.object({
	eventId: z.string().uuid({ message: 'Campo obrigatório' }),
})

export type ExportParticipantsFileModalType = z.infer<
	typeof ExportParticipantsFileModalSchema
>
