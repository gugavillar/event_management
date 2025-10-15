import { render } from '@testing-library/react'

import { DrawerBody } from './DrawerBody'

describe('DrawerBody component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<DrawerBody data-testid="drawer-body" />)
		const drawerBody = getByTestId('drawer-body')
		expect(drawerBody).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(<DrawerBody className="custom-class" data-testid="drawer-body" />)
		const drawerBody = getByTestId('drawer-body')
		expect(drawerBody).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(<DrawerBody data-testid="drawer-body" id="test" />)
		const drawerBody = getByTestId('drawer-body')
		expect(drawerBody).toHaveAttribute('id', 'test')
	})

	it('renders correct children', () => {
		const { getByTestId } = render(
			<DrawerBody data-testid="drawer-body">
				<p>teste</p>
			</DrawerBody>
		)

		const drawerBody = getByTestId('drawer-body')
		expect(drawerBody).toContainHTML('<p>teste</p>')
	})

	it('when is loading renders loading classes', () => {
		const { getByTestId } = render(<DrawerBody data-testid="drawer-body" isLoading />)
		const drawerBody = getByTestId('drawer-body')
		expect(drawerBody).toHaveClass('flex flex-col h-full items-center justify-center')
	})

	it('when is loading renders a spinner', () => {
		const { getByTestId } = render(<DrawerBody data-testid="drawer-body" isLoading />)
		const spinner = getByTestId('loading-spinner')
		expect(spinner).toBeInTheDocument()
	})
})
