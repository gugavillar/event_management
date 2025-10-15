import { render } from '@testing-library/react'

import { CHECK_IN_STATUS, StatusType } from '@/constants'
import { StatusTag } from './StatusTag'

const StatusTagArray = Object.values(CHECK_IN_STATUS)

describe('PaymentTag component', () => {
	it('renders correclty', () => {
		const { getByTestId } = render(
			<StatusTag data-testid="status-tag" status={CHECK_IN_STATUS.CONFIRMED} />
		)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<StatusTag
				className="custom-class"
				data-testid="status-tag"
				status={CHECK_IN_STATUS.CONFIRMED}
			/>
		)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<StatusTag
				data-testid="status-tag"
				id="test"
				status={CHECK_IN_STATUS.CONFIRMED}
			/>
		)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toHaveAttribute('id', 'test')
	})

	it('renders correctly custom label based on status', () => {
		const status = Math.floor(Math.random() * StatusTagArray.length)

		const { getByTestId } = render(
			<StatusTag data-testid="status-tag" status={StatusTagArray[status]} />
		)

		const statusTag = getByTestId('status-tag')

		const label = StatusType[StatusTagArray[status]].label

		expect(statusTag).toHaveTextContent(label)
	})
})
