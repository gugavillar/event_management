import { render } from '@testing-library/react'

import { FunctionTag } from './FunctionTag'

describe('Function Tag Component', () => {
	it('renders correctly', () => {
		const { getByText } = render(<FunctionTag />)
		expect(getByText('Sem função')).toBeInTheDocument()
	})

	it('renders correctly classes without status', () => {
		const { getByTestId } = render(<FunctionTag data-testid="function-tag" />)
		expect(getByTestId('function-tag')).toHaveClass('bg-gray-400 bg-opacity-30')
	})

	it('renders correctly classes with status', () => {
		const { getByText } = render(<FunctionTag status="Função" />)
		expect(getByText('Função')).toHaveClass('bg-emerald-400 bg-opacity-30')
	})

	it('renders correctly function name', () => {
		const { getByText } = render(<FunctionTag status="Função" />)
		expect(getByText('Função')).toBeInTheDocument()
	})

	it('applies custom classes', () => {
		const { getByTestId } = render(
			<FunctionTag
				status="Função"
				className="custom-class"
				data-testid="function-tag"
			/>,
		)
		expect(getByTestId('function-tag')).toHaveClass('custom-class')
	})
})
