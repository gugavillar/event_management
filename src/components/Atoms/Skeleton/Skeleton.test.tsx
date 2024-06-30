import { render } from '@testing-library/react'

import { Skeleton } from './Skeleton'

describe('Skeleton component', () => {
	it('renders with default props', () => {
		const { container } = render(<Skeleton />)
		const skeletonElement = container.firstChild

		expect(skeletonElement).toBeInTheDocument()
		expect(skeletonElement).toHaveClass('flex animate-pulse')
	})

	it('no renders children when passed', () => {
		const { getByTestId } = render(
			<Skeleton data-testid="skeleton">Skeleton</Skeleton>,
		)
		const childElement = getByTestId('skeleton')

		expect(childElement).not.toHaveTextContent('Skeleton')
	})

	it('merges additional classes with default classes', () => {
		const { container } = render(<Skeleton className="custom-class" />)
		const skeletonElement = container.querySelector('.flex > div')

		expect(skeletonElement).toHaveClass('custom-class')
	})

	it('passes additional props to the underlying div element', () => {
		const { getByTestId } = render(
			<Skeleton data-testid="skeleton" draggable />,
		)
		const skeletonElement = getByTestId('skeleton')

		expect(skeletonElement).toHaveAttribute('draggable')
	})
})
