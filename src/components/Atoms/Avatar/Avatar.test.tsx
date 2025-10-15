import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'

import { Avatar } from './Avatar'
import { generateLettersAvatar } from './Avatar.utils'

const name = faker.person.fullName()

describe('Avatar component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<Avatar data-testid="avatar">{name}</Avatar>)

		const avatar = getByTestId('avatar')

		expect(avatar).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<Avatar className="custom-class" data-testid="avatar">
				{name}
			</Avatar>
		)

		const avatar = getByTestId('avatar')

		expect(avatar).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<Avatar data-testid="avatar" id="test">
				Av
			</Avatar>
		)

		const avatar = getByTestId('avatar')

		expect(avatar).toHaveAttribute('id', 'test')
	})

	it('transform children with more than two letters in two letters', () => {
		const { getByTestId } = render(<Avatar data-testid="avatar">{name}</Avatar>)

		const avatar = getByTestId('avatar')

		const letters = generateLettersAvatar(name)

		expect(avatar).toHaveTextContent(letters)
	})

	it('renders children correctly when less than two letters', () => {
		const { getByTestId } = render(<Avatar data-testid="avatar">A</Avatar>)

		const avatar = getByTestId('avatar')

		expect(avatar).toHaveTextContent('A')
	})
})

describe('Generate Letters Avatar Function', () => {
	it('should return the first two letters of the name', () => {
		const name = 'John Doe'
		const expected = 'JD'
		const result = generateLettersAvatar(name)
		expect(result).toBe(expected)
	})

	it('should return the two firsts letters of the name', () => {
		const name = 'John'
		const expected = 'JO'
		const result = generateLettersAvatar(name)
		expect(result).toBe(expected)
	})

	it('should return the first letter of the name', () => {
		const name = 'J'
		const expected = 'J'
		const result = generateLettersAvatar(name)
		expect(result).toBe(expected)
	})
})
