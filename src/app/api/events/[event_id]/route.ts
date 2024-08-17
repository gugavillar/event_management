import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/constants'
import { FormEvent } from '@/services/queries/events/event.type'

const handlerGet = async (
	request: NextRequest,
	{ params }: { params: { event_id: string } },
) => {
	try {
		const response = await prisma.event.findUnique({
			where: {
				id: params.event_id,
			},
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

const handleDelete = async (
	request: NextRequest,
	{ params }: { params: { event_id: string } },
) => {
	try {
		const response = await prisma.event.delete({
			where: {
				id: params.event_id,
			},
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

const handleUpdate = async (
	request: NextRequest,
	{ params }: { params: { event_id: string } },
) => {
	const body: FormEvent = await request.json()
	try {
		const response = await prisma.event.update({
			data: { ...body },
			where: {
				id: params.event_id,
			},
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

export { handlerGet as GET, handleDelete as DELETE, handleUpdate as PUT }
