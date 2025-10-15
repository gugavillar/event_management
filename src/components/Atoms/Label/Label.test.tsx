import { render } from '@testing-library/react'

import { Label } from './Label'

describe('Label component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<Label data-testid="label" />)
		const label = getByTestId('label')
		expect(label).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<Label className="custom-class" data-testid="label" />
		)
		const label = getByTestId('label')
		expect(label).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(<Label data-testid="label" htmlFor="test" />)
		const label = getByTestId('label')
		expect(label).toHaveAttribute('for', 'test')
	})
})
