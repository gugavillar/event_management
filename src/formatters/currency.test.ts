import { currencyFieldValue, currencyValue, removeCurrencyFormat } from './currency'

describe('currency formatters', () => {
	it('currencyValue function format correctly', () => {
		const currencyValueNumber = currencyValue(123456)
		expect(currencyValueNumber).toContain('123.456,00')
	})

	it('currencyFieldValue function format correctly', () => {
		const currencyValueNumber = currencyFieldValue('100')
		expect(currencyValueNumber).toContain('1,00')
	})

	it('currencyFieldValue function return empty string when no value is passed', () => {
		const currencyValueNumber = currencyFieldValue('')
		expect(currencyValueNumber).toContain('')
	})

	it('currencyFieldValue function return empty string when value is equal 000', () => {
		const currencyValueNumber = currencyFieldValue('000')
		expect(currencyValueNumber).toContain('')
	})

	it('removeCurrencyFormat function format correctly', () => {
		const currencyValueNumber = removeCurrencyFormat('R$ 1.000,00')
		expect(currencyValueNumber).toContain('1000.00')
	})

	it('removeCurrencyFormat function return empty string when no value is passed', () => {
		const currencyValueNumber = removeCurrencyFormat('')
		expect(currencyValueNumber).toContain('')
	})
})
