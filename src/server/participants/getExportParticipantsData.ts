import { NextResponse } from 'next/server'
import { utils, write } from 'xlsx'

import { prisma } from '@/constants'

export const getExportParticipantsData = async (eventId: string) => {
	try {
		const participants = await prisma.participant.findMany({
			where: {
				eventId,
			},
			include: {
				Address: true,
				event: true,
				ParticipantPayment: true,
			},
		})

		if (!participants.length) {
			return NextResponse.json(
				{ error: 'Nenhum participante cadastrado' },
				{ status: 400 },
			)
		}

		const data = participants.map((participant) => ({
			Nome: participant.name,
			Email: participant.email,
			Telefone: participant.phone,
			Responsável: participant.responsible,
			Telefone_Responsável: participant.responsiblePhone,
			Endereço: `${participant.Address?.street}, ${participant.Address?.number}`,
			Cidade: `${participant.Address?.city} - ${participant.Address?.state}`,
			Bairro: participant.Address?.neighborhood,
		}))

		const tableHeader = Object.keys(data[0])

		const worksheet = utils.json_to_sheet(data, {
			header: tableHeader,
		})
		const workbook = utils.book_new()
		utils.book_append_sheet(workbook, worksheet, 'Participantes')
		const buffer = write(workbook, { type: 'buffer', bookType: 'xlsx' })

		return new NextResponse(buffer, {
			status: 200,
			headers: {
				'Content-Type':
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'Content-Disposition': `attachment; filename="participantes-${participants[0].event.name}.xlsx"`,
			},
		})
	} catch (error) {
		console.error('@getTemplateFile error:', error)
		throw Error
	}
}
