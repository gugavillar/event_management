import { render } from '@testing-library/react'

import { Alert } from './Alert'

describe('Alert component', () => {
	it('renders correctly', () => {
		const { getByText } = render(<Alert description="Test alert" />)
		expect(getByText('Test alert')).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<Alert
				description="Test alert"
				className="custom-class"
				data-testid="alert"
			/>,
		)
		expect(getByTestId('alert')).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<Alert description="Test alert" id="test" data-testid="alert" />,
		)
		expect(getByTestId('alert')).toHaveAttribute('id', 'test')
	})
})
