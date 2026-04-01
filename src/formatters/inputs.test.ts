import { faker } from '@faker-js/faker'

import { convertToBoolean, formatterComboBoxValues, formatterFieldSelectValues } from './inputs'

const MOCKED_VALUES = (quantity: number) =>
	Array.from({ length: quantity }, () => ({
		email: faker.internet.email(),
		gender: faker.person.gender(),
		id: faker.string.uuid(),
		name: faker.person.fullName(),
		phone: faker.phone.number(),
	}))

describe('inputs formatters', () => {
	it('formatterFieldSelectValues function format correctly', () => {
		const values = MOCKED_VALUES(10)
		const formattedValues = formatterFieldSelectValues(values, 'name', 'id')
		expect(formattedValues).toEqual(values.map((value) => ({ label: value.name, value: value.id })))
	})

	it('formatterFieldSelectValues function return empty array', () => {
		const formattedValues = formatterFieldSelectValues([], 'name', 'id')
		expect(formattedValues).toEqual([])
	})

	it('formatterFieldSelectValues function return empty array when no values are passed', () => {
		const formattedValues = formatterFieldSelectValues(undefined, 'name', 'id')
		expect(formattedValues).toEqual([])
	})

	it('formatterFieldSelectValues return values correctly when no label key is provided', () => {
		const mockValues = ['teste', 'teste2', 'teste3']
		const formattedValues = formatterFieldSelectValues(mockValues)
		expect(formattedValues).toEqual(mockValues.map((value) => ({ label: value, value: value })))
	})

	it('formatterComboBoxValues return empty array', () => {
		const formattedValues = formatterComboBoxValues([], 'name', 'id')
		expect(formattedValues).toEqual([])
	})

	it('formatterComboBoxValues return empty array when no values are passed', () => {
		const formattedValues = formatterComboBoxValues(undefined, 'name', 'id')
		expect(formattedValues).toEqual([])
	})

	it('formattedComboBoxValues return values correctly when no label key is provided', () => {
		const mockValues = ['teste', 'teste2', 'teste3']
		const formattedValues = formatterComboBoxValues(mockValues)
		expect(formattedValues).toEqual(mockValues.map((value) => ({ customProps: { label: value, value: value } })))
	})

	it('formatterComboBoxValues function format correctly', () => {
		const values = MOCKED_VALUES(10)
		const formattedValues = formatterComboBoxValues(values, 'name', 'id')
		expect(formattedValues).toEqual(
			values.map((value) => ({
				customProps: { label: value.name, value: value.id },
			}))
		)
	})

	it('formatterComboBoxValues function format correctly with all option', () => {
		const values = MOCKED_VALUES(10)
		const formattedValues = formatterComboBoxValues(values, 'name', 'id', true)
		expect(formattedValues).toEqual([
			{
				customProps: { label: 'Todos', value: '' },
			},
			...values.map((value) => ({
				customProps: { label: value.name, value: value.id },
			})),
		])
	})

	it('formatterComboBoxValues function format correctly with all option and label', () => {
		const values = MOCKED_VALUES(10)
		const formattedValues = formatterComboBoxValues(values, 'name', 'id', true, 'All')
		expect(formattedValues).toEqual([
			{
				customProps: { label: 'All', value: '' },
			},
			...values.map((value) => ({
				customProps: { label: value.name, value: value.id },
			})),
		])
	})

	it('convertToBoolean return false when null value is passed', () => {
		const value = convertToBoolean(null)
		expect(value).toBe(false)
	})

	it('convertToBoolean return false when empty string is passed', () => {
		const value = convertToBoolean('')
		expect(value).toBe(false)
	})

	it('convertToBoolean return true when true string is passed', () => {
		const value = convertToBoolean('true')
		expect(value).toBe(true)
	})
})
