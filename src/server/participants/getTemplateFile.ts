import { NextResponse } from 'next/server'
import { utils, write } from 'xlsx'

import { PARTICIPANTS_HEADER_TEMPLATE } from '@/constants'

export const getTemplateFile = async () => {
	try {
		const worksheet = utils.json_to_sheet([], {
			header: PARTICIPANTS_HEADER_TEMPLATE,
		})
		const workbook = utils.book_new()
		utils.book_append_sheet(workbook, worksheet, 'Participantes')
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
		console.error('@getTemplateFile error:', error)
		throw Error
	}
}
