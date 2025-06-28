import {
	formatDateToSendToApi,
	formatToBrazilianDate,
	isEqualOrIsBeforeFirstDate,
	isValidateDate,
	validateBirthdate,
	validateDateRange,
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

	it('isValidateDate return false when no value is passed', () => {
		const isDateValid = isValidateDate('')
		expect(isDateValid).toBe(false)
	})

	it('isValidateDate return true when brasilian date is valid', () => {
		const isDateValid = isValidateDate('01/01/2000')
		expect(isDateValid).toBe(true)
	})

	it('isValidateDate return false when brasilian date is not valid', () => {
		const isDateValid = isValidateDate('31/02/2000')
		expect(isDateValid).toBe(false)
	})

	it('isEqualOrIsBeforeFirstDate return false when firstDate is empty', () => {
		const isDateValid = isEqualOrIsBeforeFirstDate('', '01/01/2000')
		expect(isDateValid).toBe(false)
	})

	it('isEqualOrIsBeforeFirstDate return false when finalDate is empty', () => {
		const isValidDate = isEqualOrIsBeforeFirstDate('01/01/2000', '')
		expect(isValidDate).toBe(false)
	})

	it('isEqualOrIsBeforeFirstDate return false when firstDate is after finalDate', () => {
		const isValidDate = isEqualOrIsBeforeFirstDate('02/01/2000', '01/01/2000')
		expect(isValidDate).toBe(false)
	})

	it('isEqualOrIsBeforeFirstDate return true when firstDate is before finalDate', () => {
		const isValidDate = isEqualOrIsBeforeFirstDate('01/01/2000', '02/01/2000')
		expect(isValidDate).toBe(true)
	})

	it('isEqualOrIsBeforeFirstDate return true when firstDate is equal finalDate', () => {
		const isValidDate = isEqualOrIsBeforeFirstDate('01/01/2000', '01/01/2000')
		expect(isValidDate).toBe(true)
	})

	it('formatDateToSendToApi return empty string when no value is passed', () => {
		const dateFormatted = formatDateToSendToApi('')
		expect(dateFormatted).toBe('')
	})

	it('formatDateToSendToApi format correctly', () => {
		const dateFormatted = formatDateToSendToApi('01/01/2000')
		expect(dateFormatted).toBe('2000-01-01T02:00:00.000Z')
	})

	it('validateBirthdate return false when string is not passed', () => {
		const isValidDate = validateBirthdate('')
		expect(isValidDate).toBe(false)
	})

	it('validateBirthdate return false when date is not valid', () => {
		const isValidDate = validateBirthdate('31/02/2000')
		expect(isValidDate).toBe(false)
	})

	it('validateBirthdate return true when date is valid', () => {
		const isValidDate = validateBirthdate('01/01/2000')
		expect(isValidDate).toBe(true)
	})

	it('validateBirthdate return false when date is in the future', () => {
		const today = new Date()
		const futureDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear() + 16}`
		const isValidDate = validateBirthdate(futureDate)
		expect(isValidDate).toBe(false)
	})

	it('validateDateRange return false when string is not passed', () => {
		const isValidDate = validateDateRange('', 14, 19)
		expect(isValidDate).toBe(false)
	})

	it('validateDateRange return false when date is not valid', () => {
		const isValidDate = validateDateRange('31/02/2000', 14, 19)
		expect(isValidDate).toBe(false)
	})

	it('validateDateRange return true when date is valid', () => {
		const today = new Date()
		const sixteenYearsAgo = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear() - 16}`
		console.log(sixteenYearsAgo)
		const isValidDate = validateDateRange(sixteenYearsAgo, 14, 19)
		expect(isValidDate).toBe(true)
	})
})
