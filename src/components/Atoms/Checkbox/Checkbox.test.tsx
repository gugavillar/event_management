import { render } from '@testing-library/react'

import { Checkbox } from './Checkbox'

describe('Checkbox component', () => {
	it('renders correctly', () => {
		const { getByRole } = render(<Checkbox label="Test checkbox" />)
		expect(getByRole('checkbox')).toBeInTheDocument()
	})

	it('renders with invalid state', () => {
		const { getByRole } = render(<Checkbox isInvalid label="Test checkbox" />)
		expect(getByRole('checkbox')).toHaveClass('border-red-500 focus:border-red-500 focus:ring-red-500')
	})

	it('applies customs props', () => {
		const { getByRole } = render(<Checkbox id="test" label="Test checkbox" />)
		expect(getByRole('checkbox')).toHaveAttribute('id', 'test')
	})

	it('renders label', () => {
		const { getByText } = render(<Checkbox label="Test checkbox" />)
		expect(getByText('Test checkbox')).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByRole } = render(<Checkbox className="custom-class" label="Test checkbox" />)
		expect(getByRole('checkbox')).toHaveClass('custom-class')
	})

	it('check when click', () => {
		const { getByRole } = render(<Checkbox id="test" label="Test checkbox" />)
		expect(getByRole('checkbox')).not.toBeChecked()
		getByRole('checkbox').click()
		expect(getByRole('checkbox')).toBeChecked()
	})

	it('disabled when disabled', () => {
		const { getByRole } = render(<Checkbox disabled id="test" label="Test checkbox" />)
		expect(getByRole('checkbox')).toBeDisabled()
	})
})
