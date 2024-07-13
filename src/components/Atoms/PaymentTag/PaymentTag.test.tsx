import { render } from '@testing-library/react'

import { PaymentType, PaymentTypeAPI } from '@/constants'

import { PaymentTag } from './PaymentTag'

describe('PaymentTag component', () => {
	it('renders correclty', () => {
		const { getByTestId } = render(
			<PaymentTag status={1} data-testid="payment-tag" />,
		)

		const paymentTag = getByTestId('payment-tag')

		expect(paymentTag).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<PaymentTag
				status={1}
				data-testid="payment-tag"
				className="custom-class"
			/>,
		)

		const paymentTag = getByTestId('payment-tag')

		expect(paymentTag).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<PaymentTag status={1} data-testid="payment-tag" id="test" />,
		)

		const paymentTag = getByTestId('payment-tag')

		expect(paymentTag).toHaveAttribute('id', 'test')
	})

	it('renders correctly custom label based on status', () => {
		const status: PaymentTypeAPI = Math.floor(Math.random() * 4) + 1

		const { getByTestId } = render(
			<PaymentTag status={status} data-testid="payment-tag" />,
		)

		const paymentTag = getByTestId('payment-tag')

		const label = PaymentType[status].label

		expect(paymentTag).toHaveTextContent(label)
	})
})
