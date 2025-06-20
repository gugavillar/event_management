import { z } from 'zod'

export const ExportMeetingFileModalSchema = z.object({
	eventId: z.string().uuid({ message: 'Campo obrigatório' }),
})

export type ExportMeetingFileModalType = z.infer<
	typeof ExportMeetingFileModalSchema
>
