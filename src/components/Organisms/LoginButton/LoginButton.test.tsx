import { render } from '@testing-library/react'
import React from 'react'

import { LoginButton } from './LoginButton'

describe('LoginButton component', () => {
	it('renders Header component correctly', () => {
		const { getByText } = render(<LoginButton />)

		const header = getByText('Acesse sua conta')

		expect(header).toBeInTheDocument()
	})

	it('renders Button component correctly', () => {
		const { getByText } = render(<LoginButton />)

		const button = getByText('Acesse com o Google')

		expect(button).toBeInTheDocument()
	})

	it('button has right icon', () => {
		const { getByText } = render(<LoginButton />)

		const button = getByText('Acesse com o Google')

		expect(button).toContainHTML('svg')
	})
})
