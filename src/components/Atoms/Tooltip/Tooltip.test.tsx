jest.mock('@tanstack/react-query', () => ({
	isServer: false,
}))

describe('Tooltip component', () => {
	// test('renders correctly', () => {
	// 	render(<Tooltip>Test tooltip</Tooltip>)
	// 	expect(screen.getByText('Test tooltip')).toBeInTheDocument()
	// })
	// test('applies custom classes', () => {
	// 	render(<Tooltip className="custom-class">Test tooltip</Tooltip>)
	// 	expect(screen.getByText('Test tooltip')).toHaveClass('custom-class')
	// })
	// test('called autoinit', async () => {
	// 	render(<Tooltip>Test tooltip</Tooltip>)
	// })
})
