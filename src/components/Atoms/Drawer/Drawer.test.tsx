import { render } from '@testing-library/react'

import { Drawer } from './Drawer'

describe('Drawer component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(
			<Drawer headingTitle="Drawer test" drawerId="drawer" data-testid="drawer">
				<p>teste</p>
			</Drawer>,
		)
		const drawer = getByTestId('drawer')
		expect(drawer).toBeInTheDocument()
	})

	it('applies correct id to drawer', () => {
		const { getByTestId } = render(
			<Drawer headingTitle="Drawer test" drawerId="drawer" data-testid="drawer">
				<p>teste</p>
			</Drawer>,
		)
		const drawer = getByTestId('drawer')
		expect(drawer).toHaveAttribute('id', 'drawer')
	})

	it('applies correct heading title', () => {
		const { getByText } = render(
			<Drawer headingTitle="Drawer test" drawerId="drawer" data-testid="drawer">
				<p>teste</p>
			</Drawer>,
		)
		const heading = getByText('Drawer test')
		expect(heading).toBeInTheDocument()
	})

	it('button have correctly close attribute', () => {
		const { getByTestId } = render(
			<Drawer headingTitle="Drawer test" drawerId="drawer" data-testid="drawer">
				<p>teste</p>
			</Drawer>,
		)
		const buttonClose = getByTestId('drawer').querySelector('button')
		expect(buttonClose).toHaveAttribute('data-hs-overlay', '#drawer')
	})

	it('renders correct children', () => {
		const { getByTestId } = render(
			<Drawer headingTitle="Drawer test" drawerId="drawer" data-testid="drawer">
				<p>teste</p>
			</Drawer>,
		)
		const drawer = getByTestId('drawer')
		expect(drawer).toHaveTextContent('teste')
	})
})
