import { fireEvent, render } from '@testing-library/react'
import { createRef } from 'react'

import { MaskedInput } from './MaskedInput'

describe('Field component', () => {
	it('renders input correctly', () => {
		const { getByTestId } = render(
			<MaskedInput format="##/##/####" data-testid="mask-field" />,
		)
		expect(getByTestId('mask-field')).toBeInTheDocument()
	})

	it('displays warning when isInvalid true', () => {
		const { getByTestId } = render(
			<MaskedInput format="##/##/####" isInvalid />,
		)
		expect(getByTestId('warning-icon')).toBeInTheDocument()
	})

	it('forwards ref to input element', () => {
		const ref = createRef<HTMLInputElement>()
		render(<MaskedInput format="##/##/####" ref={ref} />)
		expect(ref.current).toBeDefined()
	})

	it('applies custom class name', () => {
		const { getByTestId } = render(
			<MaskedInput
				format="##/##/####"
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
			<MaskedInput
				format="##/##/####"
				data-testid="input-field"
				onChange={onChangeMock}
			/>,
		)

		const inputElement = getByTestId('input-field')

		fireEvent.change(inputElement, { target: { value: '15061988' } })

		expect(onChangeMock).toHaveBeenCalledTimes(1)

		expect(onChangeMock).toHaveBeenCalledWith(
			expect.objectContaining({
				target: expect.objectContaining({
					value: '15/06/1988',
				}),
			}),
		)
	})

	it('ref getting value correctly', () => {
		const onChangeMock = jest.fn()
		const ref = createRef<HTMLInputElement>()

		const { getByTestId } = render(
			<MaskedInput
				format="##/##/####"
				data-testid="input-field"
				onChange={onChangeMock}
				ref={ref}
			/>,
		)

		const inputElement = getByTestId('input-field')

		fireEvent.change(inputElement, { target: { value: '15061988' } })

		expect(ref.current?.value).toBe('15/06/1988')
	})

	it('renders rightIcon correctly when passed', () => {
		const { getByTestId } = render(
			<MaskedInput
				data-testid="input-field"
				format="##/##/####"
				rightIcon={<p>teste</p>}
			/>,
		)
		expect(getByTestId('right-icon')).toBeInTheDocument()
	})
})
