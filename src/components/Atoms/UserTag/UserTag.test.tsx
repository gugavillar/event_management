import { render } from '@testing-library/react'

import { USER_STATUS } from '@/constants'

import { UserTag } from './UserTag'

describe('UserTag component', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(
			<UserTag status={USER_STATUS.ACTIVE} data-testid="status-tag" />,
		)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<UserTag
				status={USER_STATUS.ACTIVE}
				data-testid="status-tag"
				className="custom-class"
			/>,
		)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<UserTag
				status={USER_STATUS.ACTIVE}
				data-testid="status-tag"
				id="test"
			/>,
		)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toHaveAttribute('id', 'test')
	})

	it('render correctly custom label', () => {
		const { getByText } = render(
			<UserTag status={USER_STATUS.ACTIVE} data-testid="status-tag" />,
		)
		expect(getByText(USER_STATUS.ACTIVE)).toBeInTheDocument()
	})
})
