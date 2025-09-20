import { render } from '@testing-library/react'

import { Modal } from './Modal'

describe('Modal component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(
			<Modal modalId="modal">
				<p>teste</p>
			</Modal>,
		)
		const modal = getByTestId('modal')
		expect(modal).toBeInTheDocument()
	})

	it('renders correct children', () => {
		const { getByTestId } = render(
			<Modal modalId="modal">
				<p>teste</p>
			</Modal>,
		)
		const modal = getByTestId('modal')
		expect(modal).toHaveTextContent('teste')
	})
})
