import { formatPhone } from './phones'

describe('phones formatters', () => {
	it('formatPhone function return empty string when no phone is passed', () => {
		const phone = formatPhone('')
		expect(phone).toBe('')
	})

	it('formatPhone function format correctly', () => {
		const phone = formatPhone('81999999999')
		expect(phone).toBe('(81) 99999-9999')
	})

	it('formatPhone function return empty string when phone is not valid', () => {
		const phone = formatPhone('8199999999')
		expect(phone).toBe('')
	})
})
