import { render } from '@testing-library/react'

import { USER_STATUS } from '@/constants'

import { UserTag } from './UserTag'

describe('UserTag component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<UserTag data-testid="status-tag" status={USER_STATUS.ACTIVE} />)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<UserTag className="custom-class" data-testid="status-tag" status={USER_STATUS.ACTIVE} />
		)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(<UserTag data-testid="status-tag" id="test" status={USER_STATUS.ACTIVE} />)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toHaveAttribute('id', 'test')
	})

	it('render correctly custom label', () => {
		const { getByText } = render(<UserTag data-testid="status-tag" status={USER_STATUS.ACTIVE} />)
		expect(getByText(USER_STATUS.ACTIVE)).toBeInTheDocument()
	})
})
