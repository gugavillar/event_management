import { render, screen } from '@testing-library/react'

import { Tooltip } from './Tooltip'

jest.mock('@tanstack/react-query', () => ({
	isServer: false,
}))

jest.mock('preline/preline', () => ({
	HSTooltip: {
		autoInit: jest.fn(),
	},
}))

describe('Tooltip component', () => {
	test('renders correctly', () => {
		render(<Tooltip>Test tooltip</Tooltip>)
		expect(screen.getByText('Test tooltip')).toBeInTheDocument()
	})

	test('applies custom classes', () => {
		render(<Tooltip className="custom-class">Test tooltip</Tooltip>)
		expect(screen.getByText('Test tooltip')).toHaveClass('custom-class')
	})

	test('called autoinit', async () => {
		const { HSTooltip } = await import('preline/preline')
		render(<Tooltip>Test tooltip</Tooltip>)
		expect(HSTooltip.autoInit).toHaveBeenCalled()
	})
})
