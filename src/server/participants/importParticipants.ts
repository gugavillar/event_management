import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { read, utils } from 'xlsx'
import { z } from 'zod'

import {
	PARTICIPANTS_HEADER_TEMPLATE,
	prisma,
	TRANSLATE_PARTICIPANTS_HEADER,
} from '@/constants'
import { formatDateToSendToApi, validateBirthdate } from '@/formatters'

const verifyStringOrNumber = z.coerce.string().min(1)

const verifyEmail = z
	.string()
	.email()
	.refine((value) => (!value ? false : validateEmail(value)))

const verifyDate = z
	.string()
	.refine((value) =>
		/^\d{2}\/\d{2}\/\d{4}/g.test(value) ? validateBirthdate(value) : false,
	)
	.transform((value) => formatDateToSendToApi(value))

const verifyPhone = z.coerce
	.string()
	.refine((value) => (!value ? false : validatePhone(value)))
	.transform((value) => value.replace(/\D/g, ''))

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
						validator = verifyStringOrNumber
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

const formatToAPI = (rows: Record<string, unknown>[]) => {
	return rows.map((row) =>
		Object.fromEntries(
			Object.entries(row).map(([key, value]) => [
				TRANSLATE_PARTICIPANTS_HEADER[key],
				value,
			]),
		),
	)
}

export const importParticipants = async (data: FormData) => {
	const file = data.get('file') as File
	const eventId = data.get('eventId')
	const arrayBuffer = await file.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)

	try {
		z.object({
			eventId: z.string().uuid(),
			file: z.instanceof(File),
		}).parse({ eventId, file })

		const event = await prisma.event.findUnique({
			where: {
				id: eventId as string,
			},
		})

		if (!event) {
			return NextResponse.json(
				{ error: 'Evento não encontrado' },
				{ status: 400 },
			)
		}

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

		const resValues = validateFields.parse(rows)

		const participants = formatToAPI(
			resValues,
		) as Prisma.ParticipantCreateManyInput[] & Prisma.AddressCreateManyInput[]

		return await prisma.$transaction(async (tx) => {
			for (const p of participants) {
				const participant = await tx.participant.create({
					data: {
						name: p.name,
						email: p.email,
						called: p.called,
						birthdate: p.birthdate,
						contact: p.contact,
						maritalStatus: p.maritalStatus,
						parent: p.parent,
						contactParent: p.contactParent,
						relationship: p.relationship,
						host: p.host,
						contactHost: p.contactHost,
						eventId: eventId as string,
					},
				})

				await tx.address.create({
					data: {
						street: p.street,
						neighborhood: p.neighborhood,
						number: p.number,
						city: p.city,
						state: p.state,
						participantId: participant.id,
					},
				})
			}
		})
	} catch (error) {
		console.error('@importParticipants error:', error)
		throw Error
	}
}
