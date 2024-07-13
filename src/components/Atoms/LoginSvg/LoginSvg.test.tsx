import { render } from '@testing-library/react'

import { LoginSvg } from './LoginSvg'

describe('LoginSvg component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<LoginSvg data-testid="svg-login" />)
		const svgLogin = getByTestId('svg-login')
		expect(svgLogin).toBeInTheDocument()
	})

	it('accept custom props', () => {
		const { getByTestId } = render(
			<LoginSvg data-testid="svg-login" id="svg-login" />,
		)
		const svgLogin = getByTestId('svg-login')
		expect(svgLogin).toHaveAttribute('id', 'svg-login')
	})
})
