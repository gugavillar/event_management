import z from 'zod'

const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB
const ACCEPTED_TYPE = 'image/png'

export const fileInputSchema = z
	.any()
	.refine((file) => file !== null, {
		message: 'Arquivo é obrigatório',
	})
	.refine((file) => file instanceof File, {
		message: 'Arquivo inválido',
	})
	.refine((file) => file?.size <= MAX_FILE_SIZE, {
		message: 'O arquivo deve ter no máximo 1MB',
	})
	.refine((file) => file?.type === ACCEPTED_TYPE, {
		message: 'O arquivo deve ser um PNG',
	})
