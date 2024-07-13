import { render } from '@testing-library/react'

import { StatusType, StatusTypeAPI } from '@/constants'

import { StatusTag } from './StatusTag'

describe('PaymentTag component', () => {
	it('renders correclty', () => {
		const { getByTestId } = render(
			<StatusTag status={1} data-testid="status-tag" />,
		)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<StatusTag
				status={1}
				data-testid="status-tag"
				className="custom-class"
			/>,
		)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<StatusTag status={1} data-testid="status-tag" id="test" />,
		)

		const statusTag = getByTestId('status-tag')

		expect(statusTag).toHaveAttribute('id', 'test')
	})

	it('renders correctly custom label based on status', () => {
		const status: StatusTypeAPI = Math.floor(Math.random() * 2) + 1

		const { getByTestId } = render(
			<StatusTag status={status} data-testid="status-tag" />,
		)

		const statusTag = getByTestId('status-tag')

		const label = StatusType[status].label

		expect(statusTag).toHaveTextContent(label)
	})
})
