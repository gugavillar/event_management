import { act, render } from '@testing-library/react'

import { Drawer } from './Drawer'

describe('<Drawer />', () => {
	it('should render the Drawer', () => {
		const { getByText } = render(
			<Drawer handleClose={() => jest.fn()} headingTitle="any-title" isOpen={true}>
				children
			</Drawer>
		)
		expect(getByText('children')).toBeInTheDocument()
		expect(getByText('any-title')).toBeInTheDocument()
	})

	it('should call handleClose on click close-button', async () => {
		const mockHandleClose = jest.fn()
		const { getByRole } = render(
			<Drawer handleClose={mockHandleClose} headingTitle="any-title" isOpen={true}>
				children
			</Drawer>
		)
		const closeButton = getByRole('close-button')
		act(() => {
			closeButton.click()
		})
		expect(mockHandleClose).toHaveBeenCalled()
	})
})
