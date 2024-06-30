import { fireEvent, render } from '@testing-library/react'
import { createRef } from 'react'

import { Field } from './Field'

describe('Field component', () => {
	it('renders label and input correctly', () => {
		const { getByLabelText, getByTestId } = render(
			<Field
				label="Test Label"
				id="testId"
				name="testName"
				data-testid="input-field"
			/>,
		)
		expect(getByLabelText('Test Label')).toBeInTheDocument()
		expect(getByTestId('input-field')).toBeInTheDocument()
	})

	it('displays warning and error text when isInvalid true and helpErrorText', () => {
		const { getByTestId, getByText } = render(
			<Field
				label="Test Label"
				id="testId"
				name="testName"
				isInvalid
				helpErrorText="Error message"
			/>,
		)
		expect(getByTestId('warning-icon')).toBeInTheDocument()
		expect(getByText('Error message')).toBeInTheDocument()
	})

	it('forwards ref to input element', () => {
		const ref = createRef<HTMLInputElement>()
		render(<Field label="Test Label" id="testId" name="testName" ref={ref} />)
		expect(ref.current).toBeDefined()
	})

	it('applies custom class name', () => {
		const { getByTestId } = render(
			<Field
				label="Test Label"
				className="custom-class"
				data-testid="input-field"
			/>,
		)
		const input = getByTestId('input-field')
		expect(input).toHaveClass('custom-class')
	})

	it('executa o onChange corretamente', () => {
		const onChangeMock = jest.fn()

		const { getByTestId } = render(
			<Field
				label="Test Label"
				data-testid="input-field"
				onChange={onChangeMock}
			/>,
		)

		const inputElement = getByTestId('input-field')

		fireEvent.change(inputElement, { target: { value: 'Novo valor' } })

		expect(onChangeMock).toHaveBeenCalledTimes(1)

		expect(onChangeMock).toHaveBeenCalledWith(
			expect.objectContaining({
				target: expect.objectContaining({
					value: 'Novo valor',
				}),
			}),
		)
	})

	it('ref getting value correctly', () => {
		const onChangeMock = jest.fn()
		const ref = createRef<HTMLInputElement>()

		const { getByTestId } = render(
			<Field
				label="Test Label"
				data-testid="input-field"
				onChange={onChangeMock}
				ref={ref}
			/>,
		)

		const inputElement = getByTestId('input-field')

		fireEvent.change(inputElement, { target: { value: 'Novo valor' } })

		expect(ref.current?.value).toBe('Novo valor')
	})
})
