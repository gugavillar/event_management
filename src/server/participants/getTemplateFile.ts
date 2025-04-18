import { faker } from '@faker-js/faker/locale/pt_BR'
import { format } from 'date-fns'
import { NextResponse } from 'next/server'
import { utils, write } from 'xlsx'

const generateFakeData = () => {
	return Array.from({ length: 10 }, () => ({
		Nome: faker.person.fullName(),
		Email: faker.internet.email(),
		Chamado: faker.person.firstName(),
		Nascimento: format(faker.date.birthdate(), 'dd/MM/yyyy'),
		Contato: faker.phone.number(),
		'Estado civil': 'Solteiro',
		Rua: faker.location.street(),
		Bairro: 'Bairro',
		Número: faker.location.buildingNumber(),
		Cidade: faker.location.city(),
		Estado: faker.location.state({ abbreviated: true }),
		Parente: faker.person.fullName(),
		'Contato parente': faker.phone.number(),
		Parentesco: 'Parente',
		Anfitrião: faker.person.fullName(),
		'Contato anfitrião': faker.phone.number(),
	}))
}

export const getTemplateFile = async () => {
	try {
		// const worksheet = utils.json_to_sheet([], {
		// 	header: PARTICIPANTS_HEADER_TEMPLATE,
		// })
		const worksheet = utils.json_to_sheet([...generateFakeData()])
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
