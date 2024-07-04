import { render } from '@testing-library/react'

import { ApplicationAvatar } from './ApplicationAvatar'

describe('ApplicationAvatar component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<ApplicationAvatar />)

		const applicationAvatar = getByTestId('application-avatar')

		expect(applicationAvatar).toBeInTheDocument()
	})

	it('renders a paragraph with the text "Hub de Eventos"', () => {
		const { getByText } = render(<ApplicationAvatar />)

		const paragraph = getByText('Hub de Eventos')

		expect(paragraph).toBeInTheDocument()
	})

	it('renders a paragraph with the text "Anglicana Vida"', () => {
		const { getByText } = render(<ApplicationAvatar />)

		const paragraph = getByText('Anglicana Vida')

		expect(paragraph).toBeInTheDocument()
	})

	it('renders a icon with the size of 48', () => {
		const { getByTestId } = render(<ApplicationAvatar />)

		const icon = getByTestId('ticket-icon')

		expect(icon).toHaveAttribute('width', '48')
		expect(icon).toHaveAttribute('height', '48')
	})
})
