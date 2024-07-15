import { fireEvent, render } from '@testing-library/react'
import { formatISO, startOfDay } from 'date-fns'
import { createRef } from 'react'

import { formatToBrazilianDate, formatToISODate } from '@/formatters'

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

	it('formatToBrazilianDate format correctly', () => {
		const dateFormatted = formatToBrazilianDate(new Date().toISOString())
		expect(dateFormatted).toBe(
			`${new Date().getDate()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}`,
		)
	})

	it('formatToBrazilianDate return empty string when no value is passed', () => {
		const dateFormatted = formatToBrazilianDate('')
		expect(dateFormatted).toBe('')
	})

	it('formatToISODate return empty string when no value is passed', () => {
		const dateFormatted = formatToISODate('')
		expect(dateFormatted).toBe('')
	})

	it('formatToISODate format correctly', () => {
		const dateFormatted = formatToISODate(new Date().toString())
		expect(dateFormatted).toBe(formatISO(startOfDay(new Date())))
	})
})
