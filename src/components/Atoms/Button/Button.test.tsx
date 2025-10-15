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
			</Button>
		)

		expect(getByTestId('left-icon')).toBeInTheDocument()
		expect(getByTestId('right-icon')).toBeInTheDocument()
	})

	it('applies custom className', () => {
		const { getByRole } = render(
			<Button className="custom-class">Button</Button>
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
		const { getByRole } = render(<Button isLoading>Button</Button>)
		const button = getByRole('button')
		expect(button).toBeDisabled()
	})

	it('shows spinner when isLoading is true', () => {
		const { getByTestId } = render(<Button isLoading>Button</Button>)
		const spinner = getByTestId('loading-spinner')
		expect(spinner).toBeInTheDocument()
	})

	it('spinner applies custom classe', () => {
		const { getByTestId } = render(
			<Button isLoading spinnerProps={{ className: 'custom-class' }}>
				Button
			</Button>
		)
		const spinner = getByTestId('loading-spinner')
		expect(spinner).toHaveClass('custom-class')
	})

	it('show spinner when isLoading is true and have left icon', () => {
		const { getByTestId } = render(
			<Button isLoading leftIcon={<span>👈</span>}>
				Button
			</Button>
		)
		const spinner = getByTestId('loading-spinner')
		expect(spinner).toBeInTheDocument()
	})

	it('show left icon when leftIcon is provided and isLoading is false', () => {
		const { getByTestId } = render(
			<Button
				isLoading={false}
				leftIcon={<span data-testid="left-icon">👈</span>}
			>
				Button
			</Button>
		)
		const leftIcon = getByTestId('left-icon')
		expect(leftIcon).toBeInTheDocument()
	})
})
