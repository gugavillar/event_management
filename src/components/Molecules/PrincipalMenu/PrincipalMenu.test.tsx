import { render } from '@testing-library/react'

import { PrincipalMenu } from './PrincipalMenu'
import { MENU_LINKS } from './PrincipalMenu.utils'

jest.mock('next/dist/client/router', () => ({
	useRouter: jest.fn(),
}))

describe('PrincipalMenu component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<PrincipalMenu collapsed={false} />)

		const principalMenu = getByTestId('principal-menu')

		expect(principalMenu).toBeInTheDocument()
	})

	it('haves 6 links', () => {
		const { getByTestId } = render(<PrincipalMenu collapsed={false} />)
		const length = MENU_LINKS.length

		const links = getByTestId('principal-menu').querySelectorAll('a')

		expect(links).toHaveLength(length)
	})
})
