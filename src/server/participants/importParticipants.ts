import { NextResponse } from 'next/server'
import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { read, utils } from 'xlsx'
import { z } from 'zod'

import { PARTICIPANTS_HEADER_TEMPLATE } from '@/constants'
import { validateBirthdate } from '@/formatters'

const verifyString = z.string().min(1)
const verifyEmail = z
	.string()
	.email()
	.refine((value) => (!value ? false : validateEmail(value)))
const verifyDate = z
	.string()
	.refine((value) =>
		/^\d{2}\/\d{2}\/\d{4}/g.test(value) ? validateBirthdate(value) : false,
	)
const verifyPhone = z
	.string()
	.refine((value) => (!value ? false : validatePhone(value)))
const verifyUf = z
	.string()
	.refine((value) => (!value ? false : validateUF(value)))

const validateFields = z.array(
	z.object(
		PARTICIPANTS_HEADER_TEMPLATE.reduce(
			(acc, field, index) => {
				let validator: z.ZodTypeAny
				switch (index) {
					case 1:
						validator = verifyEmail
						break
					case 3:
						validator = verifyDate
						break
					case 4:
					case 12:
					case 15:
						validator = verifyPhone
						break
					case 10:
						validator = verifyUf
						break
					default:
						validator = verifyString
				}
				acc[field] = validator
				return acc
			},
			{} as Record<string, z.ZodTypeAny>,
		),
	),
)

const isHeadersInFileInvalid = (rows: Record<string, unknown>[]) => {
	const fileHeaders = Object.keys(rows[0]).map((header) => header.trim())

	if (fileHeaders.length !== PARTICIPANTS_HEADER_TEMPLATE.length) {
		return true
	}

	return PARTICIPANTS_HEADER_TEMPLATE.some(
		(header) => !fileHeaders.includes(header),
	)
}

export const importParticipants = async (data: FormData) => {
	const file = data.get('file') as File
	const arrayBuffer = await file.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)

	try {
		const workbook = read(buffer, { type: 'buffer' })
		const sheetName = workbook.SheetNames[0]
		const worksheet = workbook.Sheets[sheetName]
		const rows = utils.sheet_to_json<Record<string, unknown>>(worksheet)

		if (!rows.length) {
			return NextResponse.json({ error: 'Arquivo vazio' }, { status: 400 })
		}

		const hasInvalidHeader = isHeadersInFileInvalid(rows)

		if (hasInvalidHeader) {
			return NextResponse.json({ error: 'Arquivo inválido' }, { status: 400 })
		}

		const r = validateFields.parse(rows)
		console.log(r)

		return NextResponse.json({ message: 'Participante criado com sucesso!' })
	} catch (error) {
		console.error('@importParticipants error:', error)
		throw Error
	}
}
