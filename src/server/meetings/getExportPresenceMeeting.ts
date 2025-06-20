import { NextResponse } from 'next/server'
import { utils, write } from 'xlsx'
import { z } from 'zod'

import { prisma } from '@/constants'

export const getExportPresenceMeeting = async (eventId: string) => {
	try {
		z.object({
			eventId: z.string().uuid(),
		}).parse({ eventId })

		const presences = await prisma.meetingPresence.findMany({
			where: {
				meeting: {
					eventId,
				},
			},
			include: {
				meeting: {
					include: {
						event: true,
					},
				},
				volunteer: true,
			},
			orderBy: {
				volunteer: {
					name: 'asc',
				},
			},
		})

		if (!presences.length) {
			return NextResponse.json(
				{ error: 'Nenhuma reunião encontrada' },
				{ status: 400 },
			)
		}

		const meetingTitles = Array.from(
			new Set(presences.map((p) => p.meeting.title).filter(Boolean)),
		)

		const volunteerMap: Record<
			string,
			{ name: string; [meetingTitle: string]: string }
		> = {}

		for (const p of presences) {
			const { volunteer, meeting, presence, justification } = p

			if (!volunteerMap[volunteer.id]) {
				volunteerMap[volunteer.id] = { name: volunteer.name }
			}

			let status = 'Falta'
			if (presence) status = 'Presente'
			else if (justification) status = 'Falta justificada'

			volunteerMap[volunteer.id][meeting.title] = status
		}

		const data = Object.values(volunteerMap).map((v) => {
			const row: Record<string, string> = {}
			row['Voluntário'] = v.name

			meetingTitles.forEach((title) => {
				if (typeof title === 'string') {
					row[title] = v[title] ?? 'Falta sem justificativa'
				}
			})

			return row
		})

		const tableHeader = Object.keys(data[0])

		const worksheet = utils.json_to_sheet(data, {
			header: tableHeader,
		})
		const workbook = utils.book_new()
		utils.book_append_sheet(
			workbook,
			worksheet,
			`Presenças - ${presences[0].meeting.event.name}`,
		)

		const buffer = write(workbook, { type: 'buffer', bookType: 'xlsx' })

		return new NextResponse(buffer, {
			status: 200,
			headers: {
				'Content-Type':
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'Content-Disposition': 'attachment; filename="lista-presenca.xlsx"',
			},
		})
	} catch (error) {
		console.error('@getExportPresenceMeeting error:', error)
		throw Error
	}
}
