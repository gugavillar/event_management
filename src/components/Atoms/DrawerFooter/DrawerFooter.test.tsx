import { render } from '@testing-library/react'

import { DrawerFooter } from './DrawerFooter'

describe('DrawerFooter component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<DrawerFooter data-testid="drawer-footer" />)
		const drawerFooter = getByTestId('drawer-footer')
		expect(drawerFooter).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<DrawerFooter data-testid="drawer-footer" className="custom-class" />,
		)
		const drawerFooter = getByTestId('drawer-footer')
		expect(drawerFooter).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<DrawerFooter data-testid="drawer-footer" id="test" />,
		)
		const drawerFooter = getByTestId('drawer-footer')
		expect(drawerFooter).toHaveAttribute('id', 'test')
	})

	it('renders correct children', () => {
		const { getByTestId } = render(
			<DrawerFooter data-testid="drawer-footer">
				<p>teste</p>
			</DrawerFooter>,
		)

		const drawerFooter = getByTestId('drawer-footer')
		expect(drawerFooter).toContainHTML('<p>teste</p>')
	})
})
