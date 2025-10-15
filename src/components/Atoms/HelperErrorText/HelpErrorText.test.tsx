import { render } from '@testing-library/react'

import { HelperErrorText } from './HelperErrorText'

describe('HelperErrorText component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<HelperErrorText data-testid="helper-text" />)
		const helperText = getByTestId('helper-text')
		expect(helperText).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(<HelperErrorText className="custom-class" data-testid="helper-text" />)
		const helperText = getByTestId('helper-text')
		expect(helperText).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(<HelperErrorText data-testid="helper-text" id="test" />)
		const helperText = getByTestId('helper-text')
		expect(helperText).toHaveAttribute('id', 'test')
	})
})
