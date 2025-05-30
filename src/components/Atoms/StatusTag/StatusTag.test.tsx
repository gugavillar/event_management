import { render } from '@testing-library/react'

import { CHECK_IN_STATUS, StatusType } from '@/constants'

import { StatusTag } from './StatusTag'

const StatusTagArray = Object.values(CHECK_IN_STATUS)

describe('PaymentTag component', () => {
	it('renders correclty', () => {
		const { getByTestId } = render(
			<StatusTag status={CHECK_IN_STATUS.CONFIRMED} data-testid="status-tag" />,
		)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<StatusTag
				status={CHECK_IN_STATUS.CONFIRMED}
				data-testid="status-tag"
				className="custom-class"
			/>,
		)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<StatusTag
				status={CHECK_IN_STATUS.CONFIRMED}
				data-testid="status-tag"
				id="test"
			/>,
		)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toHaveAttribute('id', 'test')
	})

	it('renders correctly custom label based on status', () => {
		const status = Math.floor(Math.random() * StatusTagArray.length)

		const { getByTestId } = render(
			<StatusTag status={StatusTagArray[status]} data-testid="status-tag" />,
		)

		const statusTag = getByTestId('status-tag')

		const label = StatusType[StatusTagArray[status]].label

		expect(statusTag).toHaveTextContent(label)
	})
})
