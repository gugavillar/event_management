import { fireEvent, render } from '@testing-library/react'
import { createRef } from 'react'

import { Checkbox } from './Checkbox'

describe('Checkbox component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<Checkbox data-testid="checkbox" />)
		const checkbox = getByTestId('checkbox')
		expect(checkbox).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<Checkbox data-testid="checkbox" className="custom-class" />,
		)
		const checkbox = getByTestId('checkbox')
		expect(checkbox).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<Checkbox data-testid="checkbox" id="test" />,
		)
		const checkbox = getByTestId('checkbox')
		expect(checkbox).toHaveAttribute('id', 'test')
	})

	it('checked when user clicks', () => {
		const { getByTestId } = render(<Checkbox data-testid="checkbox" />)
		const checkbox = getByTestId('checkbox')
		fireEvent.click(checkbox)
		expect(checkbox).toBeChecked()
	})

	it('not checked when user clicks', () => {
		const { getByTestId } = render(
			<Checkbox data-testid="checkbox" defaultChecked />,
		)
		const checkbox = getByTestId('checkbox')
		fireEvent.click(checkbox)
		expect(checkbox).not.toBeChecked()
	})

	it('forwards ref to input element', () => {
		const ref = createRef<HTMLInputElement>()
		render(<Checkbox ref={ref} />)
		expect(ref.current).toBeDefined()
	})

	it('refs get value correctly', () => {
		const ref = createRef<HTMLInputElement>()
		render(<Checkbox ref={ref} />)
		expect(ref.current?.checked).toBe(false)
		fireEvent.click(ref.current!)
		expect(ref.current?.checked).toBe(true)
	})

	it('renders children correctly and accept click to check', () => {
		const { getByTestId } = render(
			<Checkbox id="default" data-testid="checkbox">
				<label data-testid="checkbox-label" htmlFor="default">
					Default checkbox
				</label>
			</Checkbox>,
		)
		const checkboxLabel = getByTestId('checkbox-label')
		const checkbox = getByTestId('checkbox')
		expect(checkboxLabel).toHaveTextContent('Default checkbox')
		fireEvent.click(checkboxLabel)
		expect(checkbox).toBeChecked()
	})
})
