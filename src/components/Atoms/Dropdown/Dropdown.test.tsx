import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Dropdown, DropdownItem } from './Dropdown'

describe('Dropdown component', () => {
	it('renders correctly', () => {
		const { getByText } = render(
			<Dropdown trigger={<button>Test dropdown</button>}>
				<DropdownItem>option 1</DropdownItem>
			</Dropdown>
		)
		expect(getByText('Test dropdown')).toBeInTheDocument()
	})

	it('show options when click in trigger', async () => {
		const user = userEvent.setup()
		const { getByText } = render(
			<Dropdown trigger={<button>Test dropdown</button>}>
				<DropdownItem>option 1</DropdownItem>
			</Dropdown>
		)

		await user.click(getByText('Test dropdown'))

		expect(getByText('option 1')).toBeInTheDocument()
	})
})
