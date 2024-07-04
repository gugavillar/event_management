import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'

import { Avatar } from './Avatar'

const name = faker.person.fullName()

describe('Avatar component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<Avatar data-testid="avatar">{name}</Avatar>)

		const avatar = getByTestId('avatar')

		expect(avatar).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<Avatar data-testid="avatar" className="custom-class">
				{name}
			</Avatar>,
		)

		const avatar = getByTestId('avatar')

		expect(avatar).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<Avatar data-testid="avatar" id="test">
				Av
			</Avatar>,
		)

		const avatar = getByTestId('avatar')

		expect(avatar).toHaveAttribute('id', 'test')
	})

	it('transform children with more than two letters in two letters', () => {
		const { getByTestId } = render(<Avatar data-testid="avatar">{name}</Avatar>)

		const avatar = getByTestId('avatar')

		const letters = name.slice(0, 2).toUpperCase()

		expect(avatar).toHaveTextContent(letters)
	})

	it('renders children correctly when less than two letters', () => {
		const { getByTestId } = render(<Avatar data-testid="avatar">A</Avatar>)

		const avatar = getByTestId('avatar')

		expect(avatar).toHaveTextContent('A')
	})
})
