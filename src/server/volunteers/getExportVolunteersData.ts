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

export const getExportVolunteersData = async (eventId: string) => {
	try {
		z.object({
			eventId: z.string().uuid(),
		}).parse({ eventId })

		const volunteers = await prisma.volunteer.findMany({
			where: {
				eventId,
			},
			include: {
				address: true,
				event: true,
				eventRoles: {
					include: {
						leaders: true,
						volunteerRole: true,
					},
				},
				groupMemberships: {
					include: {
						group: true,
					},
				},
				roomMember: {
					include: {
						room: true,
					},
				},
			},
			orderBy: {
				name: 'asc',
			},
		})

		const payments = await prisma.volunteerPayment.findMany({
			where: {
				eventId,
			},
			include: {
				volunteer: true,
			},
			orderBy: {
				volunteer: {
					name: 'asc',
				},
			},
		})

		if (!volunteers.length) {
			return NextResponse.json(
				{ error: 'Nenhum voluntário cadastrado' },
				{ status: 400 },
			)
		}

		const volunteersData = volunteers.map((volunteer) => ({
			Nome: volunteer.name,
			Chamado: volunteer.called,
			Email: volunteer.email,
			Data_Nascimento: formatBirthdate(
				volunteer.birthdate,
				volunteer.event.finalDate,
			),
			Telefone: formatPhone(volunteer.phone),
			Parente: volunteer.relative,
			Telefone_Parente: formatPhone(volunteer.relativePhone),
			Endereço: `${volunteer.address?.street}, ${volunteer.address?.number}`,
			Cidade: `${volunteer.address?.city} - ${volunteer.address?.state}`,
			Bairro: volunteer.address?.neighborhood,
			Função: !volunteer.eventRoles?.length
				? 'Sem Função'
				: volunteer.eventRoles
						.map((role) =>
							role.eventId === eventId &&
							role.leaders.some((leader) => leader.id === volunteer.id)
								? `${role.volunteerRole.role} - Líder`
								: role.volunteerRole.role,
						)
						.join(', '),
			Célula: volunteer.cell || 'Nenhuma',
			Alimentação_Saúde: volunteer.health || 'Não possui',
			Quarto:
				volunteer.roomMember?.find(
					(room) =>
						room.volunteerId === volunteer.id && room.room.eventId === eventId,
				)?.room.roomNumber || 'Sem quarto',
			Grupo:
				volunteer.groupMemberships?.find(
					(group) =>
						group.volunteerId === volunteer.id &&
						group.group.eventId === eventId,
				)?.group.name || 'Sem grupo',
			Status: formatCheckIn(volunteer.checkIn),
		}))

		const paymentsData = payments.map((payment) => ({
			Nome: payment.volunteer.name,
			Valor_Pago: currencyValue(Number(payment.paymentValue)),
			Status: paymentStatus(payment.volunteer.checkIn, payment.paymentType),
			Data_Pagamento: paymentDate(payment.paymentType, payment.updatedAt),
		}))

		const tableHeaderVolunteers = Object.keys(volunteersData[0])
		const worksheetVolunteers = utils.json_to_sheet(volunteersData, {
			header: tableHeaderVolunteers,
		})
		const tableHeaderPayments = Object.keys(paymentsData[0])
		const worksheetPayments = utils.json_to_sheet(paymentsData, {
			header: tableHeaderPayments,
		})
		const workbook = utils.book_new()
		utils.book_append_sheet(workbook, worksheetVolunteers, 'Voluntários')
		utils.book_append_sheet(workbook, worksheetPayments, 'Pagamentos')
		const buffer = write(workbook, { type: 'buffer', bookType: 'xlsx' })

		return new NextResponse(buffer, {
			status: 200,
			headers: {
				'Content-Type':
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'Content-Disposition': 'attachment; filename="voluntarios.xlsx"',
			},
		})
	} catch (error) {
		console.error('@getExportVolunteersData error:', error)
		throw Error
	}
}
