import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/constants'

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

export { handlerGet as GET }
