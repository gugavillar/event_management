import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { read, utils } from 'xlsx'
import { z } from 'zod'

import {
	prisma,
	TRANSLATE_VOLUNTEERS_HEADER,
	VOLUNTEERS_HEADER_TEMPLATE,
} from '@/constants'
import { formatDateToSendToApi, validateBirthdate } from '@/formatters'

const verifyString = z.coerce.string().min(1)

const verifyEmail = z
	.string()
	.email()
	.refine((value) => validateEmail(value))

const verifyDate = z
	.string()
	.refine(
		(value) => /^\d{2}\/\d{2}\/\d{4}/g.test(value) && validateBirthdate(value),
	)
	.transform((value) => formatDateToSendToApi(value))

const verifyPhone = z.coerce
	.string()
	.refine((value) => validatePhone(value))
	.transform((value) => value.replace(/\D/g, ''))

const verifyUf = z.string().refine((value) => validateUF(value))

const validateFields = z.array(
	z.object(
		VOLUNTEERS_HEADER_TEMPLATE.reduce(
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

	if (fileHeaders.length !== VOLUNTEERS_HEADER_TEMPLATE.length) {
		return true
	}

	return VOLUNTEERS_HEADER_TEMPLATE.some(
		(header) => !fileHeaders.includes(header),
	)
}

const formatToAPI = (rows: Record<string, unknown>[]) => {
	return rows.map((row) =>
		Object.fromEntries(
			Object.entries(row).map(([key, value]) => [
				TRANSLATE_VOLUNTEERS_HEADER[key],
				value,
			]),
		),
	)
}

export const importVolunteers = async (data: FormData) => {
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

		const volunteers = formatToAPI(
			resValues,
		) as Prisma.ParticipantCreateManyInput[] &
			Prisma.VolunteerAddressCreateManyInput[]

		return await prisma.$transaction(async (tx) => {
			for (const v of volunteers) {
				const volunteer = await tx.volunteer.create({
					data: {
						name: v.name,
						email: v.email,
						called: v.called,
						birthdate: v.birthdate,
						contact: v.phone,
						maritalStatus: '',
						parent: '',
						contactParent: '',
						relationship: '',
						eventId: eventId as string,
					},
				})

				await tx.volunteerAddress.create({
					data: {
						street: v.street,
						neighborhood: v.neighborhood,
						number: v.number,
						city: v.city,
						state: v.state,
						volunteerId: volunteer.id,
					},
				})
			}
		})
	} catch (error) {
		console.error('@importParticipants error:', error)
		throw Error
	}
}
