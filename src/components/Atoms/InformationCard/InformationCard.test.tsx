import { render } from '@testing-library/react'

import { InformationCard } from './InformationCard'

describe('InformationCard component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(
			<InformationCard
				headingText="Information"
				data-testid="information-card"
			/>,
		)

		const informationCard = getByTestId('information-card')

		expect(informationCard).toBeInTheDocument()
	})

	it('renders correctly with action button', () => {
		const { getByTestId } = render(
			<InformationCard
				headingText="Information"
				data-testid="information-card"
				actionButton={<button data-testid="action-button">Action</button>}
			/>,
		)

		const actionButton = getByTestId('action-button')

		expect(actionButton).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<InformationCard
				headingText="Information"
				data-testid="information-card"
				className="custom-class"
			/>,
		)

		const informationCard = getByTestId('information-card')

		expect(informationCard).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<InformationCard
				headingText="Information"
				data-testid="information-card"
				id="test"
			/>,
		)

		const informationCard = getByTestId('information-card')

		expect(informationCard).toHaveAttribute('id', 'test')
	})

	it('renders correclty children', () => {
		const { getByTestId } = render(
			<InformationCard headingText="Information" data-testid="information-card">
				<p>children</p>
			</InformationCard>,
		)

		const informationCard = getByTestId('information-card')

		expect(informationCard).toContainHTML('children')
	})
})
