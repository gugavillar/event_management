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
			data: { ...body, userId: '7b323ec3-5323-4636-856e-b0c1fcf6cabe' },
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
				where: {
					name: { startsWith: searchParams },
				},
				orderBy: {
					name: 'asc',
				},
			}),
			...(!searchParams && {
				orderBy: {
					createdAt: 'desc',
				},
			}),
		})

		return NextResponse.json(response)
	} catch {
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
