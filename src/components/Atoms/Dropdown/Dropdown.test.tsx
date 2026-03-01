jest.mock('@tanstack/react-query', () => ({
	isServer: false,
}))

describe('Dropdown component', () => {
	// it('renders correctly', () => {
	// 	render(
	// 		<Dropdown label="Test dropdown">
	// 			<p>option 1</p>
	// 		</Dropdown>
	// 	)
	// 	expect(screen.getByText('Test dropdown')).toBeInTheDocument()
	// 	expect(screen.getByText('option 1')).toBeInTheDocument()
	// })
	// it('called autoInit', async () => {
	// 	render(
	// 		<Dropdown label="Test dropdown">
	// 			<p>option 1</p>
	// 		</Dropdown>
	// 	)
	// })
})
