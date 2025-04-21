import { z } from 'zod'

import { FILES_TYPES } from '@/constants'

export const ImportVolunteersFileModalSchema = z.object({
	eventId: z.string().uuid(),
	file: z
		.any()
		.refine((files) => files instanceof FileList && files.length > 0, {
			message: 'Arquivo obrigatório',
		})
		.refine((files) => [FILES_TYPES.xlsx].includes(files?.[0]?.type), {
			message: 'Tipo de arquivo inválido',
		}),
})

export type ImportVolunteersFileModalType = z.infer<
	typeof ImportVolunteersFileModalSchema
>
