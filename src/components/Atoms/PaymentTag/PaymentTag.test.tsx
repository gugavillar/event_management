import { render } from '@testing-library/react'

import { PaymentType, PaymentTypeAPI } from '@/constants'

import { PaymentTag } from './PaymentTag'

const PaymentTagStatusArray = Object.values(PaymentTypeAPI)

describe('PaymentTag component', () => {
	it('renders correclty', () => {
		const { getByTestId } = render(
			<PaymentTag status={PaymentTypeAPI.CARD} data-testid="payment-tag" />,
		)

		const paymentTag = getByTestId('payment-tag')

		expect(paymentTag).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<PaymentTag
				status={PaymentTypeAPI.CARD}
				data-testid="payment-tag"
				className="custom-class"
			/>,
		)

		const paymentTag = getByTestId('payment-tag')

		expect(paymentTag).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { getByTestId } = render(
			<PaymentTag
				status={PaymentTypeAPI.CARD}
				data-testid="payment-tag"
				id="test"
			/>,
		)

		const paymentTag = getByTestId('payment-tag')

		expect(paymentTag).toHaveAttribute('id', 'test')
	})

	it('renders correctly custom label based on status', () => {
		const status = Math.floor(Math.random() * PaymentTagStatusArray.length)

		const { getByTestId } = render(
			<PaymentTag
				status={PaymentTagStatusArray[status]}
				data-testid="payment-tag"
			/>,
		)

		const paymentTag = getByTestId('payment-tag')

		const label = PaymentType[PaymentTagStatusArray[status]].label

		expect(paymentTag).toHaveTextContent(label)
	})
})
