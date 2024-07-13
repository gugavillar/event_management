import { faker } from '@faker-js/faker'
import { fireEvent, render } from '@testing-library/react'
import { createRef } from 'react'

import { Select } from './Select'

const generateOptions = (length: number) => {
	return Array.from({ length }, () => ({
		label: faker.person.fullName(),
		value: faker.string.uuid(),
	}))
}

describe('Field component', () => {
	it('renders input correctly', () => {
		const { getByTestId } = render(
			<Select data-testid="select-field" options={generateOptions(6)} />,
		)
		expect(getByTestId('select-field')).toBeInTheDocument()
	})

	it('displays warning when isInvalid true', () => {
		const { getByTestId } = render(
			<Select
				data-testid="select-field"
				options={generateOptions(9)}
				isInvalid
			/>,
		)
		expect(getByTestId('warning-icon')).toBeInTheDocument()
	})

	it('forwards ref to input element', () => {
		const ref = createRef<HTMLSelectElement>()
		render(
			<Select
				data-testid="select-field"
				options={generateOptions(10)}
				ref={ref}
			/>,
		)
		expect(ref.current).toBeDefined()
	})

	it('applies custom class name', () => {
		const { getByTestId } = render(
			<Select
				data-testid="select-field"
				options={generateOptions(2)}
				className="custom-class"
			/>,
		)
		const select = getByTestId('select-field')
		expect(select).toHaveClass('custom-class')
	})

	it('renders options correctly', () => {
		const onChangeMock = jest.fn()
		const randomOption = Math.floor(Math.random() * 8) + 1
		const OPTIONS = generateOptions(randomOption)

		const { getByTestId } = render(
			<Select
				data-testid="select-field"
				options={OPTIONS}
				onChange={onChangeMock}
			/>,
		)

		const options = getByTestId('select-field').querySelectorAll('option')

		expect(options).toHaveLength(OPTIONS.length)
	})

	it('ref getting value correctly', () => {
		const onChangeMock = jest.fn()
		const ref = createRef<HTMLSelectElement>()
		const OPTIONS = generateOptions(8)
		const randomOption = Math.floor(Math.random() * OPTIONS.length)

		const { getByTestId } = render(
			<Select
				options={OPTIONS}
				onChange={onChangeMock}
				ref={ref}
				data-testid="select-field"
			/>,
		)

		const selectOption = OPTIONS[randomOption].value

		const selectElement = getByTestId('select-field')

		fireEvent.change(selectElement, { target: { value: selectOption } })

		expect(ref.current?.value).toBe(selectOption)
	})

	it('renders first option as placeholder', () => {
		const { getByTestId } = render(
			<Select
				data-testid="select-field"
				options={generateOptions(10)}
				placeholder="Selecione"
			/>,
		)
		const select = getByTestId('select-field').querySelectorAll('option')[0]

		expect(select).toContainHTML('Selecione')
	})

	it('renders nothing if options is a empty array', () => {
		const { container } = render(
			<Select data-testid="select-field" options={[]} />,
		)

		expect(container.firstChild).toBeNull()
	})
})
