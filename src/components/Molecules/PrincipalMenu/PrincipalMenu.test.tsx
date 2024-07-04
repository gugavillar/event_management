import { render } from '@testing-library/react'

import { PrincipalMenu } from './PrincipalMenu'

jest.mock('next/dist/client/router', () => ({
	useRouter: jest.fn(),
}))

describe('PrincipalMenu component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<PrincipalMenu />)

		const principalMenu = getByTestId('principal-menu')

		expect(principalMenu).toBeInTheDocument()
	})

	it('haves 6 links', () => {
		const { getByTestId } = render(<PrincipalMenu />)

		const links = getByTestId('principal-menu').querySelectorAll('a')

		expect(links).toHaveLength(6)
	})

	it('have dashboard menu', () => {
		const { getByText } = render(<PrincipalMenu />)

		const dashboard = getByText('Dashboard')

		expect(dashboard).toBeInTheDocument()
	})
})
