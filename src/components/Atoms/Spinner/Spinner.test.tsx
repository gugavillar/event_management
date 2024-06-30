import { render } from '@testing-library/react'

import { Spinner } from './Spinner'

describe('Spinner component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<Spinner data-testid="spinner" />)
		const spinner = getByTestId('spinner')
		expect(spinner).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<Spinner data-testid="spinner" className="custom-class" />,
		)
		const spinner = getByTestId('spinner')
		expect(spinner).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<Spinner data-testid="spinner" aria-label="loading" />,
		)
		const spinner = getByTestId('spinner')
		expect(spinner).toHaveAttribute('aria-label', 'loading')
	})

	it('renders screen reader text for accessibility', () => {
		const { getByText } = render(<Spinner />)
		const srText = getByText('Loading...')

		expect(srText).toBeInTheDocument()
	})
})
