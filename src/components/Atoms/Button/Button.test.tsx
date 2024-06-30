import { fireEvent, render } from '@testing-library/react'

import { Button } from './Button'

describe('Button component', () => {
	it('renders button with children', () => {
		const { getByRole } = render(<Button>Button</Button>)
		const button = getByRole('button', { name: 'Button' })
		expect(button).toBeInTheDocument()
		expect(button).toHaveTextContent('Button')
	})

	it('renders button with left and right icons', () => {
		const leftIcon = <span data-testid="left-icon">👈</span>
		const rightIcon = <span data-testid="right-icon">👉</span>
		const { getByTestId } = render(
			<Button leftIcon={leftIcon} rightIcon={rightIcon}>
				Button
			</Button>,
		)

		expect(getByTestId('left-icon')).toBeInTheDocument()
		expect(getByTestId('right-icon')).toBeInTheDocument()
	})

	it('applies custom className', () => {
		const { getByRole } = render(
			<Button className="custom-class">Button</Button>,
		)
		const button = getByRole('button', { name: 'Button' })
		expect(button).toHaveClass('custom-class')
	})

	it('calls onClick function when clicked', () => {
		const mockFn = jest.fn()
		const { getByRole } = render(<Button onClick={mockFn}>Button</Button>)
		const button = getByRole('button', { name: 'Button' })
		fireEvent.click(button)
		expect(mockFn).toHaveBeenCalledTimes(1)
	})

	it('disables button when isLoading is true', () => {
		const { getByRole, getByTestId } = render(<Button isLoading>Button</Button>)
		const button = getByRole('button')
		expect(button).toBeDisabled()
		expect(button).toContainElement(getByTestId('loading-spinner'))
	})
})
