import { fireEvent, render } from '@testing-library/react'
import { createRef } from 'react'

import { Field } from './Field'

describe('Field component', () => {
	it('renders input correctly', () => {
		const { getByTestId } = render(<Field data-testid="input-field" />)
		expect(getByTestId('input-field')).toBeInTheDocument()
	})

	it('displays warning when isInvalid true', () => {
		const { getByTestId } = render(<Field isInvalid />)
		expect(getByTestId('warning-icon')).toBeInTheDocument()
	})

	it('forwards ref to input element', () => {
		const ref = createRef<HTMLInputElement>()
		render(<Field ref={ref} />)
		expect(ref.current).toBeDefined()
	})

	it('applies custom class name', () => {
		const { getByTestId } = render(
			<Field className="custom-class" data-testid="input-field" />
		)
		const input = getByTestId('input-field')
		expect(input).toHaveClass('custom-class')
	})

	it('executa o onChange corretamente', () => {
		const onChangeMock = jest.fn()

		const { getByTestId } = render(
			<Field data-testid="input-field" onChange={onChangeMock} />
		)

		const inputElement = getByTestId('input-field')

		fireEvent.change(inputElement, { target: { value: 'Novo valor' } })

		expect(onChangeMock).toHaveBeenCalledTimes(1)

		expect(onChangeMock).toHaveBeenCalledWith(
			expect.objectContaining({
				target: expect.objectContaining({
					value: 'Novo valor',
				}),
			})
		)
	})

	it('ref getting value correctly', () => {
		const onChangeMock = jest.fn()
		const ref = createRef<HTMLInputElement>()

		const { getByTestId } = render(
			<Field data-testid="input-field" onChange={onChangeMock} ref={ref} />
		)

		const inputElement = getByTestId('input-field')

		fireEvent.change(inputElement, { target: { value: 'Novo valor' } })

		expect(ref.current?.value).toBe('Novo valor')
	})

	it('renders rightIcon correctly when passed', () => {
		const { getByTestId } = render(
			<Field data-testid="input-field" rightIcon={<p>teste</p>} />
		)
		expect(getByTestId('right-icon')).toBeInTheDocument()
	})

	it('disabled when disabled is true', () => {
		const { getByTestId } = render(<Field data-testid="input-field" disabled />)
		expect(getByTestId('input-field')).toBeDisabled()
	})
})
