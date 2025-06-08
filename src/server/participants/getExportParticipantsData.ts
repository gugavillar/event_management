import { differenceInYears, format } from 'date-fns'
import { NextResponse } from 'next/server'
import { utils, write } from 'xlsx'
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
				address: true,
				event: true,
				roomMember: {
					include: {
						room: true,
					},
				},
				groupMemberships: {
					include: {
						group: true,
					},
				},
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
			Endereço: `${participant.address?.street}, ${participant.address?.number}`,
			Cidade: `${participant.address?.city} - ${participant.address?.state}`,
			Bairro: participant.address?.neighborhood,
			Convidou: participant.host,
			Telefone_Convidou: formatPhone(participant.hostPhone),
			Religião: participant.religion || 'Não possui',
			Alimentação_Saúde: participant.health || 'Não possui',
			Quarto:
				participant.roomMember?.find(
					(room) =>
						room.participantId === participant.id &&
						room.room.eventId === eventId,
				)?.room.roomNumber || 'Sem quarto',
			Grupo:
				participant.groupMemberships?.find(
					(group) =>
						group.participantId === participant.id &&
						group.group.eventId === eventId,
				)?.group.name || 'Sem grupo',
		}))

		const tableHeader = Object.keys(data[0])
		const worksheet = utils.json_to_sheet(data, {
			header: tableHeader,
		})
		const workbook = utils.book_new()
		utils.book_append_sheet(
			workbook,
			worksheet,
			`Participantes - ${participants[0].event.name}`,
		)
		const buffer = write(workbook, { type: 'buffer', bookType: 'xlsx' })

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
