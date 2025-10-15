import { render } from '@testing-library/react'

import { Link } from './Link'

describe('Link component', () => {
	it('renders correctly', () => {
		const { getByRole } = render(<Link href="#">Link</Link>)

		const link = getByRole('link', { name: 'Link' })

		expect(link).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByRole } = render(
			<Link className="custom-class" href="#">
				Link
			</Link>
		)

		const link = getByRole('link', { name: 'Link' })

		expect(link).toHaveClass('custom-class')
	})

	it('renders change href', () => {
		const { getByRole } = render(
			<Link as="/link" href="#">
				Link
			</Link>
		)

		const link = getByRole('link', { name: 'Link' })

		expect(link).toHaveAttribute('href', '/link')
	})
})
