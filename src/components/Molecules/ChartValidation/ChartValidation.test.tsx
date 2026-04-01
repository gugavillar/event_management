import { render } from '@testing-library/react'

import { ChartValidation } from './ChartValidation'

describe('ChartValidation component', () => {
	it('show spinner when is loading', () => {
		const { getByRole } = render(<ChartValidation isLoading />)
		expect(getByRole('spinner')).toBeInTheDocument()
	})

	it('should show "Não existem dados" when data is empty', () => {
		const { getByText } = render(<ChartValidation categories={[]} isLoading={false} series={[]} />)
		expect(getByText('Não existem dados')).toBeInTheDocument()
	})
})
