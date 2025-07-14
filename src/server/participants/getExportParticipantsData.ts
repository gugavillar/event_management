import { NextResponse } from 'next/server'
import { utils, write } from 'xlsx'
import { z } from 'zod'

import { prisma } from '@/constants'
import {
	currencyValue,
	formatBirthdate,
	formatCheckIn,
	formatPhone,
	paymentDate,
	paymentStatus,
} from '@/formatters'

export const getExportParticipantsData = async (
	eventId: string,
	isInterested: boolean,
) => {
	try {
		z.object({
			eventId: z.string().uuid(),
		}).parse({ eventId })

		const participants = await prisma.participant.findMany({
			where: {
				eventId,
				...(isInterested
					? { interested: true }
					: { OR: [{ interested: false }, { interested: null }] }),
			},
			include: {
				address: true,
				event: true,
				payments: true,
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
				...(isInterested ? { createdAt: 'asc' } : { name: 'asc' }),
			},
		})

		if (!participants.length) {
			return NextResponse.json(
				{
					error: isInterested
						? 'Nenhuma pessoa interessada cadastrada'
						: 'Nenhum participante cadastrado',
				},
				{ status: 400 },
			)
		}

		if (isInterested) {
			const interestedData = participants.map((participant) => ({
				Nome: participant.name,
				Chamado: participant.called,
				Email: participant.email,
				Data_Nascimento: formatBirthdate(
					participant.birthdate,
					participant.event.finalDate,
				),
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
			}))
			const tableHeaderParticipants = Object.keys(interestedData[0])
			const worksheetParticipants = utils.json_to_sheet(interestedData, {
				header: tableHeaderParticipants,
			})
			const workbook = utils.book_new()
			utils.book_append_sheet(workbook, worksheetParticipants, 'Interessados')
			const buffer = write(workbook, { type: 'buffer', bookType: 'xlsx' })

			return new NextResponse(buffer, {
				status: 200,
				headers: {
					'Content-Type':
						'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					'Content-Disposition': 'attachment; filename="interessados.xlsx"',
				},
			})
		}

		const participantsData = participants.map((participant) => ({
			Nome: participant.name,
			Chamado: participant.called,
			Email: participant.email,
			Data_Nascimento: formatBirthdate(
				participant.birthdate,
				participant.event.finalDate,
			),
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
			Status: formatCheckIn(participant.checkIn),
		}))

		const paymentsData = participants.map((payment) => {
			const paymentValue = payment.payments.reduce(
				(acc, p) => (acc += p.paymentValue.toNumber()),
				0,
			)
			const statusPayments = payment.payments
				.map((p) => paymentStatus(payment.checkIn, p.paymentType))
				.join(', ')
			const datesPayments = payment.payments
				.map((p) => paymentDate(p.paymentType, p.updatedAt))
				.join(', ')
			return {
				Nome: payment.name,
				Valor_Pago: currencyValue(paymentValue),
				Status: statusPayments,
				Data_Pagamento: datesPayments,
			}
		})

		const tableHeaderParticipants = Object.keys(participantsData[0])
		const worksheetParticipants = utils.json_to_sheet(participantsData, {
			header: tableHeaderParticipants,
		})
		const tableHeaderPayments = Object.keys(paymentsData[0])
		const worksheetPayments = utils.json_to_sheet(paymentsData, {
			header: tableHeaderPayments,
		})
		const workbook = utils.book_new()
		utils.book_append_sheet(workbook, worksheetParticipants, 'Participantes')
		utils.book_append_sheet(workbook, worksheetPayments, 'Pagamentos')
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
