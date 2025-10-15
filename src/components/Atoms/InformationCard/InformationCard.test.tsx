import { render } from '@testing-library/react'

import { InformationCard } from './InformationCard'

describe('InformationCard component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<InformationCard data-testid="information-card" headingText="Information" />)

		const informationCard = getByTestId('information-card')

		expect(informationCard).toBeInTheDocument()
	})

	it('renders correctly with action button', () => {
		const { getByTestId } = render(
			<InformationCard
				actionButton={<button data-testid="action-button">Action</button>}
				data-testid="information-card"
				headingText="Information"
			/>
		)

		const actionButton = getByTestId('action-button')

		expect(actionButton).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<InformationCard className="custom-class" data-testid="information-card" headingText="Information" />
		)

		const informationCard = getByTestId('information-card')

		expect(informationCard).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<InformationCard data-testid="information-card" headingText="Information" id="test" />
		)

		const informationCard = getByTestId('information-card')

		expect(informationCard).toHaveAttribute('id', 'test')
	})

	it('renders correclty children', () => {
		const { getByTestId } = render(
			<InformationCard data-testid="information-card" headingText="Information">
				<p>children</p>
			</InformationCard>
		)

		const informationCard = getByTestId('information-card')

		expect(informationCard).toContainHTML('children')
	})
})
