import { NextResponse } from 'next/server'
import { z } from 'zod'

import { generateColumnWidths, prisma } from '@/constants'
import {
	currencyValue,
	formatBirthdate,
	formatCheckIn,
	formatPhone,
	paymentDate,
	paymentStatus,
} from '@/formatters'
import { utils, write } from 'xlsx'

export const getExportParticipantsData = async (
	eventId: string,
	isInterested: boolean
) => {
	try {
		z.object({
			eventId: z.uuid(),
		}).parse({ eventId })

		const participants = await prisma.participant.findMany({
			include: {
				address: true,
				event: true,
				groupMemberships: {
					include: {
						group: true,
					},
				},
				payments: true,
				roomMember: {
					include: {
						room: true,
					},
				},
			},
			orderBy: {
				...(isInterested ? { createdAt: 'asc' } : { name: 'asc' }),
			},
			where: {
				eventId,
				...(isInterested
					? { interested: true }
					: { OR: [{ interested: false }, { interested: null }] }),
			},
		})

		if (!participants.length) {
			return NextResponse.json(
				{
					error: isInterested
						? 'Nenhuma pessoa interessada cadastrada'
						: 'Nenhum participante cadastrado',
				},
				{ status: 400 }
			)
		}

		if (isInterested) {
			const interestedData = participants.map((participant) => ({
				Alimentação_Saúde: participant.health || 'Não possui',
				Bairro: participant.address?.neighborhood,
				Chamado: participant.called,
				Cidade: `${participant.address?.city} - ${participant.address?.state}`,
				Convidou: participant.host,
				Data_Nascimento: formatBirthdate(
					participant.birthdate,
					participant.event.finalDate
				),
				Email: participant.email,
				Endereço: `${participant.address?.street}, ${participant.address?.number}`,
				Nome: participant.name,
				Religião: participant.religion || 'Não possui',
				Responsável: participant.responsible,
				Telefone: formatPhone(participant.phone),
				Telefone_Convidou: formatPhone(participant.hostPhone),
				Telefone_Responsável: formatPhone(participant.responsiblePhone),
			}))
			const tableHeaderParticipants = Object.keys(interestedData[0])
			const worksheetParticipants = utils.json_to_sheet(interestedData, {
				header: tableHeaderParticipants,
			})
			const workbook = utils.book_new()
			utils.book_append_sheet(workbook, worksheetParticipants, 'Interessados')
			worksheetParticipants['!cols'] = generateColumnWidths(interestedData)
			const buffer = write(workbook, { bookType: 'xlsx', type: 'buffer' })

			return new NextResponse(buffer, {
				headers: {
					'Content-Disposition': 'attachment; filename="interessados.xlsx"',
					'Content-Type':
						'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				},
				status: 200,
			})
		}

		const participantsData = participants.map((participant) => ({
			Alimentação_Saúde: participant.health || 'Não possui',
			Bairro: participant.address?.neighborhood,
			Chamado: participant.called,
			Cidade: `${participant.address?.city} - ${participant.address?.state}`,
			Convidou: participant.host,
			Data_Nascimento: formatBirthdate(
				participant.birthdate,
				participant.event.finalDate
			),
			Email: participant.email,
			Endereço: `${participant.address?.street}, ${participant.address?.number}`,
			Grupo:
				participant.groupMemberships?.find(
					(group) =>
						group.participantId === participant.id &&
						group.group.eventId === eventId
				)?.group.name || 'Sem grupo',
			Nome: participant.name,
			Quarto:
				participant.roomMember?.find(
					(room) =>
						room.participantId === participant.id &&
						room.room.eventId === eventId
				)?.room.roomNumber || 'Sem quarto',
			Religião: participant.religion || 'Não possui',
			Responsável: participant.responsible,
			Status: formatCheckIn(participant.checkIn),
			Telefone: formatPhone(participant.phone),
			Telefone_Convidou: formatPhone(participant.hostPhone),
			Telefone_Responsável: formatPhone(participant.responsiblePhone),
		}))

		const paymentsData = participants.map((payment) => {
			const paymentValue = payment.payments.reduce(
				(acc, p) => (acc += p.paymentValue.toNumber()),
				0
			)
			const hasPayment = payment.payments.length > 0
			const statusPayments = !hasPayment
				? paymentStatus(payment.checkIn, null)
				: payment.payments
						.map((p) => paymentStatus(payment.checkIn, p.paymentType))
						.join(', ')
			const datesPayments = payment.payments
				.map((p) => paymentDate(p.paymentType, p.updatedAt))
				.join(', ')
			return {
				Data_Pagamento: datesPayments,
				Nome: payment.name,
				Status: statusPayments,
				Valor_Pago: currencyValue(paymentValue),
			}
		})

		const tableHeaderParticipants = Object.keys(participantsData[0])
		const worksheetParticipants = utils.json_to_sheet(participantsData, {
			header: tableHeaderParticipants,
		})
		worksheetParticipants['!cols'] = generateColumnWidths(participantsData)
		const tableHeaderPayments = Object.keys(paymentsData[0])
		const worksheetPayments = utils.json_to_sheet(paymentsData, {
			header: tableHeaderPayments,
		})
		worksheetPayments['!cols'] = generateColumnWidths(paymentsData)
		const workbook = utils.book_new()
		utils.book_append_sheet(workbook, worksheetParticipants, 'Participantes')
		utils.book_append_sheet(workbook, worksheetPayments, 'Pagamentos')
		const buffer = write(workbook, { bookType: 'xlsx', type: 'buffer' })

		return new NextResponse(buffer, {
			headers: {
				'Content-Disposition': 'attachment; filename="participantes.xlsx"',
				'Content-Type':
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			},
			status: 200,
		})
	} catch (error) {
		console.error('@getExportParticipantsData error:', error)
		throw Error
	}
}
