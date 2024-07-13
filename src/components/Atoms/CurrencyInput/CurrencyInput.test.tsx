import { render } from '@testing-library/react'
import { createRef } from 'react'

import {
	currencyFieldValue,
	currencyValue,
	removeCurrencyFormat,
} from '@/formatters'

import { CurrencyInput } from './CurrencyInput'

describe('Field component', () => {
	it('renders input correctly', () => {
		const { getByTestId } = render(
			<CurrencyInput data-testid="currency-field" />,
		)
		expect(getByTestId('currency-field')).toBeInTheDocument()
	})

	it('displays warning when isInvalid true', () => {
		const { getByTestId } = render(<CurrencyInput isInvalid />)
		expect(getByTestId('warning-icon')).toBeInTheDocument()
	})

	it('forwards ref to input element', () => {
		const ref = createRef<HTMLInputElement>()
		render(<CurrencyInput ref={ref} />)
		expect(ref.current).toBeDefined()
	})

	it('applies custom class name', () => {
		const { getByTestId } = render(
			<CurrencyInput className="custom-class" data-testid="currency-field" />,
		)
		const input = getByTestId('currency-field')
		expect(input).toHaveClass('custom-class')
	})

	it('renders rightIcon correctly when passed', () => {
		const { getByTestId } = render(
			<CurrencyInput data-testid="currency-field" rightIcon={<p>teste</p>} />,
		)
		expect(getByTestId('right-icon')).toBeInTheDocument()
	})

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

	it('removeCurrencyFormat function format correcty', () => {
		const currencyValueNumber = removeCurrencyFormat('R$ 1.000,00')
		console.log(currencyValueNumber)
		expect(currencyValueNumber).toContain('1000.00')
	})

	it('removeCurrencyFormat function return empty string when no value is passed', () => {
		const currencyValueNumber = removeCurrencyFormat('')
		expect(currencyValueNumber).toContain('')
	})
})
