import { render, screen } from '@testing-library/react'

import { Dropdown } from './Dropdown'

jest.mock('@tanstack/react-query', () => ({
	isServer: false,
}))

jest.mock('preline/preline', () => ({
	HSDropdown: {
		autoInit: jest.fn(),
	},
}))

describe('Dropdown component', () => {
	it('renders correctly', () => {
		render(
			<Dropdown label="Test dropdown">
				<p>option 1</p>
			</Dropdown>,
		)

		expect(screen.getByText('Test dropdown')).toBeInTheDocument()
		expect(screen.getByText('option 1')).toBeInTheDocument()
	})

	it('called autoInit', async () => {
		const { HSDropdown } = await import('preline/preline')
		render(
			<Dropdown label="Test dropdown">
				<p>option 1</p>
			</Dropdown>,
		)
		expect(HSDropdown.autoInit).toHaveBeenCalled()
	})
})
