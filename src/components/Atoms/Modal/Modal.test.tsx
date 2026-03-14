import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Modal } from './Modal'

describe('Modal component', () => {
	it('should render correctly modal', () => {
		const mockedOnOpenChange = vi.fn()
		const { getByText } = render(
			<Modal onOpenChange={mockedOnOpenChange} open>
				modal
			</Modal>
		)
		expect(getByText('modal')).toBeInTheDocument()
	})

	it('should called onOpenChange when click close button', async () => {
		const user = userEvent.setup()
		const mockedOnOpenChange = vi.fn()
		const { getByRole } = render(
			<Modal onOpenChange={mockedOnOpenChange} open>
				modal
			</Modal>
		)
		const closeButton = getByRole('close-modal')
		await user.click(closeButton)
		expect(mockedOnOpenChange).toHaveBeenCalled()
	})

	it('should have classes when is large', () => {
		const mockedOnOpenChange = vi.fn()
		const { getByRole } = render(
			<Modal isLarge onOpenChange={mockedOnOpenChange} open>
				modal
			</Modal>
		)
		const content = getByRole('content')
		expect(content).toHaveClass('md:w-xl lg:w-6xl')
	})
})
