import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Tooltip } from './Tooltip'

describe('Tooltip component', () => {
	it('should renders correctly', async () => {
		const user = userEvent.setup()

		const { getByText, findAllByText } = render(<Tooltip trigger={<button>Test</button>}>tooltip text</Tooltip>)

		await user.hover(getByText('Test'))

		expect(getByText('Test')).toBeInTheDocument()
		const tooltip = await findAllByText('tooltip text')

		expect(tooltip[0]).toBeInTheDocument()
	})
})
