import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

import { prisma } from '@/constants'
import { formatZodValidationErrors } from '@/formatters'
import { FormEvent } from '@/services/queries/events/event.type'

import { eventSchemaRoute } from './event.schema'

const handlerPost = async (request: NextRequest) => {
	const body: FormEvent = await request.json()

	try {
		eventSchemaRoute.parse(body)
		// TODO: trocar depois para pegar o id do usuário pelo next auth
		await prisma.event.create({
			data: { ...body, userId: '9f3aadfd-47d8-4063-9ad3-2afd6d2a8c5d' },
		})

		return NextResponse.json({ message: 'Evento criado com sucesso!' })
	} catch (error) {
		if (error instanceof ZodError) {
			const errorsFormatted = formatZodValidationErrors(error.errors)

			return NextResponse.json(
				{
					error: 'Erro de validação dos campos.',
					message: errorsFormatted,
				},
				{ status: 422 },
			)
		}

		return NextResponse.json(
			{
				error: 'Erro interno do servidor!',
			},
			{ status: 500 },
		)
	} finally {
		await prisma.$disconnect()
	}
}

const handlerGet = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams.get('search')
	try {
		const response = await prisma.event.findMany({
			...(searchParams && {
				where: { name: { contains: searchParams, mode: 'insensitive' } },
			}),
			orderBy: { name: 'asc' },
		})

		return NextResponse.json(response)
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Erro interno do servidor!',
			},
			{ status: 500 },
		)
	} finally {
		await prisma.$disconnect()
	}
}

export { handlerPost as POST, handlerGet as GET }
