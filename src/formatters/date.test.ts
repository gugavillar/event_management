import { endOfDay, formatISO, startOfDay } from 'date-fns'

import {
	formatToBrazilianDate,
	formatToISODate,
	isEqualOrIsBeforeFirstDate,
	isValidateDate,
} from './date'

describe('date formatters', () => {
	it('formatToBrazilianDate format correctly', () => {
		const dateFormatted = formatToBrazilianDate(new Date().toISOString())
		expect(dateFormatted).toBe(
			`${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}`,
		)
	})

	it('formatToBrazilianDate return empty string when no value is passed', () => {
		const dateFormatted = formatToBrazilianDate('')
		expect(dateFormatted).toBe('')
	})

	it('formatToISODate return empty string when no value is passed', () => {
		const dateFormatted = formatToISODate('', true)
		expect(dateFormatted).toBe('')
	})

	it('formatToISODate format correctly with start of day', () => {
		const dateFormatted = formatToISODate(new Date().toString(), true)
		expect(dateFormatted).toBe(formatISO(startOfDay(new Date())))
	})

	it('formatToISODate format correctly with end of day', () => {
		const dateFormatted = formatToISODate(new Date().toString(), false)
		expect(dateFormatted).toBe(formatISO(endOfDay(new Date())))
	})

	it('its return false when no date is passed to validate date and future date', () => {
		const isFuture = isValidateDate('')
		expect(isFuture).toBe(false)
	})

	it('its return true when date is passed to validate date and future date is future and valid', () => {
		const today = new Date()
		const tomorrow = today.setDate(today.getDate() + 1)
		const dateTomorrow = new Date(tomorrow)
		const isFuture = isValidateDate(
			`${dateTomorrow.getDate()}/${dateTomorrow.getMonth() + 1}/${dateTomorrow.getFullYear()}`,
		)
		expect(isFuture).toBe(true)
	})

	it('its return false when no date is passed to is equal or is before first date', () => {
		const isEqualOrIsBefore = isEqualOrIsBeforeFirstDate('', '')
		expect(isEqualOrIsBefore).toBe(false)
	})

	it('its return true when dates is passed to is before first date', () => {
		const firstDate = new Date()
		const stringFirstDate = `${firstDate.getDate()}/${firstDate.getMonth() + 1}/${firstDate.getFullYear()}`

		const finalDate = new Date()
		const newFinalDate = finalDate.setDate(finalDate.getDate() + 1)
		const dateFinal = new Date(newFinalDate)
		const stringFinalDate = `${dateFinal.getDate()}/${dateFinal.getMonth() + 1}/${dateFinal.getFullYear()}`

		const isEqualOrIsBefore = isEqualOrIsBeforeFirstDate(
			stringFirstDate,
			stringFinalDate,
		)
		expect(isEqualOrIsBefore).toBe(true)
	})

	it('its return true when dates is passed to is equal', () => {
		const firstDate = new Date()
		const stringFirstDate = `${firstDate.getDate()}/${firstDate.getMonth() + 1}/${firstDate.getFullYear()}`

		const finalDate = new Date()
		const stringFinalDate = `${finalDate.getDate()}/${finalDate.getMonth() + 1}/${finalDate.getFullYear()}`

		const isEqualOrIsBefore = isEqualOrIsBeforeFirstDate(
			stringFirstDate,
			stringFinalDate,
		)
		expect(isEqualOrIsBefore).toBe(true)
	})
})
