import { render } from '@testing-library/react'

import { Text } from './Text'

describe('Text component', () => {
	it('renders correctly', () => {
		const { getByText } = render(<Text>Text</Text>)

		const text = getByText('Text')

		expect(text).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByText } = render(<Text className="custom-class">Text</Text>)

		const text = getByText('Text')

		expect(text).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByText } = render(<Text id="test">Text</Text>)

		const text = getByText('Text')

		expect(text).toHaveAttribute('id', 'test')
	})

	it('renders a span when as is set to "span"', () => {
		const { getByText } = render(<Text as="span">Text</Text>)

		const text = getByText('Text')

		expect(text.tagName).toBe('SPAN')
	})

	it('renders a p when as is not set', () => {
		const { getByText } = render(<Text>Text</Text>)

		const text = getByText('Text')

		expect(text.tagName).toBe('P')
	})
})
