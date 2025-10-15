import { render } from '@testing-library/react'

import { ChartContainer } from './ChartContainer'

describe('ChartContainer component', () => {
	it('renders correctly', () => {
		const { getByText } = render(
			<ChartContainer headingText="Test component" />
		)
		expect(getByText('Test component')).toBeInTheDocument()
	})

	it('renders correctly with subheading', () => {
		const { getByText } = render(
			<ChartContainer
				headingText="Test component"
				subheadingText="Subheading"
			/>
		)
		expect(getByText('Subheading')).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<ChartContainer
				className="custom-class"
				data-testid="chart-container"
				headingText="Test component"
			/>
		)
		expect(getByTestId('chart-container')).toHaveClass('custom-class')
	})

	it('accept children', () => {
		const { getByText } = render(
			<ChartContainer headingText="Test component">
				<div>Children</div>
			</ChartContainer>
		)
		expect(getByText('Children')).toBeInTheDocument()
	})
})
