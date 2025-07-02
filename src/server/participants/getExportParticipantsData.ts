import { differenceInYears, format } from 'date-fns'
import { NextResponse } from 'next/server'
import { utils, write } from 'xlsx'
import { z } from 'zod'

import {
	CHECK_IN_STATUS,
	PaymentType,
	PaymentTypeAPI,
	prisma,
	StatusType,
} from '@/constants'
import { currencyValue, formatPhone } from '@/formatters'

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

		const payments = await prisma.participantPayment.findMany({
			where: {
				eventId,
			},
			include: {
				participant: true,
			},
			orderBy: {
				participant: {
					name: 'asc',
				},
			},
		})

		if (!participants.length) {
			return NextResponse.json(
				{ error: 'Nenhum participante cadastrado' },
				{ status: 400 },
			)
		}

		const participantsData = participants.map((participant) => ({
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
			Status: !participant.checkIn
				? StatusType[CHECK_IN_STATUS.NOT_ANSWERED].label
				: StatusType[participant.checkIn].label,
		}))

		const paymentsData = payments.map((payment) => ({
			Nome: payment.participant.name,
			Valor_Pago: currencyValue(Number(payment.paymentValue)),
			Status: !payment.paymentType
				? PaymentType[PaymentTypeAPI.OPEN].label
				: PaymentType[PaymentTypeAPI[payment.paymentType]].label,
			Data_Pagamento: payment.paymentType
				? format(payment.updatedAt, 'dd/MM/yyyy')
				: '',
		}))

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
