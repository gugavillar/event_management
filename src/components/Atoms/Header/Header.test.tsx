import { render } from '@testing-library/react'

import { Header } from './Header'

const HEADING_ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

describe('Header component', () => {
	it('renders correctly h1 when as is not defined', () => {
		const { container } = render(<Header data-testid="header">Header</Header>)

		const header = container.querySelector('h1')

		expect(header).toBeInTheDocument()
	})

	it('renders correctly heading element passed in as prop', () => {
		const heading =
			HEADING_ELEMENTS[Math.floor(Math.random() * HEADING_ELEMENTS.length)]

		const { getByText } = render(
			<Header as={heading} data-testid="header">
				Header
			</Header>
		)

		const header = getByText('Header')

		expect(header.tagName).toBe(heading.toUpperCase())
	})

	it('applies custom classes', () => {
		const { container } = render(
			<Header className="custom-class" data-testid="header">
				Header
			</Header>
		)

		const header = container.querySelector('h1')

		expect(header).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { container } = render(
			<Header data-testid="header" id="test">
				Header
			</Header>
		)

		const header = container.querySelector('h1')

		expect(header).toHaveAttribute('id', 'test')
	})
})
