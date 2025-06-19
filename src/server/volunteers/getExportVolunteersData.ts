import { differenceInYears, format } from 'date-fns'
import { NextResponse } from 'next/server'
import { utils, write } from 'xlsx'
import { z } from 'zod'

import { prisma } from '@/constants'
import { formatPhone } from '@/formatters'

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

		if (!volunteers.length) {
			return NextResponse.json(
				{ error: 'Nenhum voluntário cadastrado' },
				{ status: 400 },
			)
		}

		const data = volunteers.map((volunteer) => ({
			Nome: volunteer.name,
			Chamado: volunteer.called,
			Email: volunteer.email,
			Data_Nascimento: `${format(volunteer.birthdate, 'dd/MM/yyyy')} - ${differenceInYears(new Date(volunteer.event.finalDate), volunteer.birthdate)} anos`,
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
						room.participantId === volunteer.id &&
						room.room.eventId === eventId,
				)?.room.roomNumber || 'Sem quarto',
			Grupo:
				volunteer.groupMemberships?.find(
					(group) =>
						group.participantId === volunteer.id &&
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
			`Voluntários - ${volunteers[0].event.name}`,
		)
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
