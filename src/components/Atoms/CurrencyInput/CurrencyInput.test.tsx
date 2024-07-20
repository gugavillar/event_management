import { render } from '@testing-library/react'
import { createRef } from 'react'

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
})
