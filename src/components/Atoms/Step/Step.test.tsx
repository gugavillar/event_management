import { screen, render, fireEvent } from '@testing-library/react'

import { Step } from './Step'

const stepsProps = {
	steps: [
		{
			title: 'Step 1',
			content: <p>Content 1</p>,
		},
		{
			title: 'Step 2',
			content: <p>Content 2</p>,
		},
	],
	handleNext: jest.fn(),
	handlePrev: jest.fn(),
	handleFinish: jest.fn(),
}

describe('Step component', () => {
	test('renders correctly', () => {
		render(<Step {...stepsProps} currentStep={0} isPending={false} />)

		expect(screen.getByText('Step 1')).toBeInTheDocument()
	})

	test('call handleNext when click next button', () => {
		render(<Step {...stepsProps} currentStep={0} isPending={false} />)
		const nextButton = screen.getByRole('button', { name: /Próximo/i })
		fireEvent.click(nextButton)
		expect(stepsProps.handleNext).toHaveBeenCalled()
	})

	test('call handlePrev when click prev button', () => {
		render(<Step {...stepsProps} currentStep={1} isPending={false} />)
		const prevButton = screen.getByRole('button', { name: /Voltar/i })
		fireEvent.click(prevButton)
		expect(stepsProps.handlePrev).toHaveBeenCalled()
	})

	test('call handleFinish when click finish button', () => {
		render(<Step {...stepsProps} currentStep={1} isPending={false} />)
		const finishButton = screen.getByRole('button', { name: /Finalizar/i })
		fireEvent.click(finishButton)
		expect(stepsProps.handleFinish).toHaveBeenCalled()
	})
})
