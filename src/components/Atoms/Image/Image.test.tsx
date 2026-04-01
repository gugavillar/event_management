import { render } from '@testing-library/react'

import { Image } from './Image'

describe('Image', () => {
	it('should renders correctly', () => {
		const { getByRole } = render(<Image backgroundImage="/placeholder.png" />)
		expect(getByRole('img')).toBeInTheDocument()
	})

	it('should received correct src', () => {
		const { getByRole } = render(<Image backgroundImage="/placeholder.png" />)
		expect(getByRole('img')).toHaveAttribute('src', '/_next/image?url=%2Fplaceholder.png&w=3840&q=75')
	})
})
