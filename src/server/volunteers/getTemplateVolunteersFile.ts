import { NextResponse } from 'next/server'
import { utils, write } from 'xlsx'

import { VOLUNTEERS_HEADER_TEMPLATE } from '@/constants'

export const getTemplateVolunteersFile = async () => {
	try {
		const worksheet = utils.json_to_sheet([], {
			header: VOLUNTEERS_HEADER_TEMPLATE,
		})
		const workbook = utils.book_new()
		utils.book_append_sheet(workbook, worksheet, 'Voluntários')
		const buffer = write(workbook, { type: 'buffer', bookType: 'xlsx' })

		return new NextResponse(buffer, {
			status: 200,
			headers: {
				'Content-Type':
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'Content-Disposition': 'attachment; filename="voluntários.xlsx"',
			},
		})
	} catch (error) {
		console.error('@getTemplateFile error:', error)
		throw Error
	}
}
