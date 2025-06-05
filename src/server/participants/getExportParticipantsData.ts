import { differenceInYears, format } from 'date-fns'
import ExcelJS from 'exceljs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/constants'
import { formatPhone } from '@/formatters'

export const getExportParticipantsData = async (eventId: string) => {
	try {
		z.object({
			eventId: z.string().uuid(),
		}).parse({ eventId })

		const participants = await prisma.participant.findMany({
			where: {
				eventId,
			},
			include: {
				Address: true,
				event: true,
			},
			orderBy: {
				name: 'asc',
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
			Chamado: participant.called,
			Email: participant.email,
			Data_Nascimento: `${format(participant.birthdate, 'dd/MM/yyyy')} - ${differenceInYears(new Date(participant.event.finalDate), participant.birthdate)} anos`,
			Telefone: formatPhone(participant.phone),
			Responsável: participant.responsible,
			Telefone_Responsável: formatPhone(participant.responsiblePhone),
			Endereço: `${participant.Address?.street}, ${participant.Address?.number}`,
			Cidade: `${participant.Address?.city} - ${participant.Address?.state}`,
			Bairro: participant.Address?.neighborhood,
			Convidou: participant.host,
			Telefone_Convidou: formatPhone(participant.hostPhone),
			Religião: participant.religion || 'Não possui',
			Alimentação_Saúde: participant.health || 'Não possui',
		}))

		const workbook = new ExcelJS.Workbook()
		const worksheet = workbook.addWorksheet(
			`Participantes - ${participants[0].event.name}`,
		)
		const headers = Object.keys(data[0])
		const headerRow = worksheet.addRow(headers)

		headerRow.eachCell((cell) => {
			cell.font = { bold: true }
		})

		data.forEach((row) => {
			worksheet.addRow(Object.values(row))
		})

		const buffer = await workbook.xlsx.writeBuffer()

		return new NextResponse(buffer, {
			status: 200,
			headers: {
				'Content-Type':
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'Content-Disposition': 'attachment; filename="participantes.xlsx"',
			},
		})
	} catch (error) {
		console.error('@getExportParticipantsData error:', error)
		throw Error
	}
}
