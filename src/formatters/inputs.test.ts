import { faker } from '@faker-js/faker'

import { formatterFieldSelectValues } from './inputs'

const MOCKED_VALUES = (quantity: number) =>
	Array.from({ length: quantity }, () => ({
		id: faker.string.uuid(),
		name: faker.person.fullName(),
		gender: faker.person.gender(),
		email: faker.internet.email(),
		phone: faker.phone.number(),
	}))

describe('inputs formatters', () => {
	it('formatterFieldSelectValues function format correctly', () => {
		const values = MOCKED_VALUES(10)
		const formattedValues = formatterFieldSelectValues(values, 'name', 'id')
		expect(formattedValues).toEqual(
			values.map((value) => ({ label: value.name, value: value.id })),
		)
	})

	it('formatterFieldSelectValues function return empty array', () => {
		const formattedValues = formatterFieldSelectValues([], 'name', 'id')
		expect(formattedValues).toEqual([])
	})
})
