import { fireEvent, render } from '@testing-library/react'
import { createRef } from 'react'

import { Radio } from './Radio'

const options = [
	{
		label: 'radio 1',
		description: 'description radio 1',
		id: '1',
		value: '1',
	},
	{
		label: 'radio 2',
		description: 'description radio 2',
		id: '2',
		value: '2',
	},
]

describe('Radio component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(
			<Radio options={options} name="radio-test" />,
		)
		const radio = getByTestId('radio')
		expect(radio).toBeInTheDocument()
	})

	it('applies custom props in input radios', () => {
		const { getAllByTestId } = render(
			<Radio options={options} name="radio-test" data-testid="radio-input" />,
		)

		const radios = getAllByTestId('radio-input')

		expect(radios[0]).toHaveAttribute('data-testid', 'radio-input')
		expect(radios[1]).toHaveAttribute('data-testid', 'radio-input')
	})

	it('content is null when options is empty', () => {
		const { container } = render(<Radio options={[]} name="radio-test" />)

		expect(container.firstChild).toBeNull()
	})

	it('applies errors classes correctly when is invalid', () => {
		const { getAllByTestId } = render(
			<Radio
				options={options}
				name="radio-test"
				isInvalid
				data-testid="radio-input"
			/>,
		)

		const radios = getAllByTestId('radio-input')

		expect(radios[0]).toHaveClass(
			'border-red-500 focus:border-red-500 focus:ring-red-500',
		)
		expect(radios[1]).toHaveClass(
			'border-red-500 focus:border-red-500 focus:ring-red-500',
		)
	})

	it('renders the correct number of options', () => {
		const { getAllByRole } = render(<Radio options={options} />)

		const radioOptions = getAllByRole('radio')

		expect(radioOptions).toHaveLength(options.length)
	})

	it('renders labels and descriptions correctly', () => {
		const { getByText } = render(<Radio options={options} />)

		options.forEach((option) => {
			expect(getByText(option.label)).toBeInTheDocument()
			expect(getByText(option.description)).toBeInTheDocument()
		})
	})

	it('forwards ref to input radio element', () => {
		const ref = createRef<HTMLInputElement>()
		render(<Radio options={options} ref={ref} />)

		expect(ref.current).toBeDefined()
	})

	it('executa o onChange corretamente', () => {
		const onChangeMock = jest.fn()

		const { getAllByRole } = render(
			<Radio options={options} name="radio-test" onChange={onChangeMock} />,
		)

		const radio = getAllByRole('radio')

		fireEvent.click(radio[0], { target: { value: options[0].value } })

		expect(onChangeMock).toHaveBeenCalledTimes(1)

		expect(onChangeMock).toHaveBeenCalledWith(
			expect.objectContaining({
				target: expect.objectContaining({
					value: options[0].value,
				}),
			}),
		)
	})
})
