import { faker } from '@faker-js/faker'
import { fireEvent, render } from '@testing-library/react'

import { UUID } from 'crypto'

import { Table } from './Table'

const generateTableData = (length: number) => {
	const tableData = Array.from({ length }, () => ({
		id: faker.string.uuid() as UUID,
		name: faker.person.fullName(),
		email: faker.internet.email(),
		phone: faker.phone.number(),
		birthdate: faker.date.birthdate().getUTCDate(),
		action: <button>Button</button>,
	}))

	const tableFields = Object.keys(tableData[0])

	const tableHeader = tableFields.map((field) => ({
		label: field,
		accessor: field,
	}))

	return { tableHeader, tableData }
}

describe('Table component', () => {
	it('renders correctly', () => {
		const { tableHeader, tableData } = generateTableData(15)
		const { getByTestId } = render(
			<Table
				headerLabels={tableHeader}
				bodyData={tableData}
				data-testid="table"
				isLoading={false}
			/>,
		)

		expect(getByTestId('table')).toBeInTheDocument()
	})

	it('applies custom class name', () => {
		const { tableHeader, tableData } = generateTableData(15)
		const { getByTestId } = render(
			<Table
				headerLabels={tableHeader}
				bodyData={tableData}
				data-testid="table"
				className="custom-class"
				isLoading={false}
			/>,
		)
		expect(getByTestId('table')).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { tableHeader, tableData } = generateTableData(15)
		const { getByTestId } = render(
			<Table
				headerLabels={tableHeader}
				bodyData={tableData}
				data-testid="table"
				width={150}
				isLoading={false}
			/>,
		)
		expect(getByTestId('table')).toHaveAttribute('width', '150')
	})

	it('handle click function called when click in column data', () => {
		const handleClick = jest.fn()
		const { tableHeader, tableData } = generateTableData(15)
		const { getByTestId } = render(
			<Table
				headerLabels={tableHeader}
				bodyData={tableData}
				data-testid="table"
				handleClickRow={(row) => handleClick(row)}
				isLoading={false}
			/>,
		)

		const rows = getByTestId('table').querySelectorAll('tbody tr td')

		fireEvent.click(rows[tableHeader.length - 2])

		expect(handleClick).toHaveBeenCalled()
	})

	it('handle click function called with correct data', () => {
		const handleClick = jest.fn()
		const { tableHeader, tableData } = generateTableData(15)
		const randomIndex = Math.floor(Math.random() * tableData.length)
		const { getByTestId } = render(
			<Table
				headerLabels={tableHeader}
				bodyData={tableData}
				data-testid="table"
				handleClickRow={(row) => handleClick(row)}
				isLoading={false}
			/>,
		)

		const row = getByTestId('table').querySelectorAll('tbody tr')[randomIndex]

		fireEvent.click(row.firstChild as HTMLElement)

		expect(handleClick).toHaveBeenCalledWith(tableData[randomIndex])
	})

	it('not have function when a react element is passed', () => {
		const handleClick = jest.fn()
		const { tableHeader, tableData } = generateTableData(15)
		const randomIndex = Math.floor(Math.random() * tableData.length)
		const { getByTestId } = render(
			<Table
				headerLabels={tableHeader}
				bodyData={tableData}
				data-testid="table"
				handleClickRow={(row) => handleClick(row)}
				isLoading={false}
			/>,
		)

		const row = getByTestId('table').querySelectorAll('tbody tr')[randomIndex]

		fireEvent.click(row.lastChild as HTMLElement)

		expect(handleClick).not.toHaveBeenCalled()
	})

	it('render spinner when is loading true and table data is undefined', () => {
		const { tableHeader } = generateTableData(15)
		const { getByTestId } = render(
			<Table
				headerLabels={tableHeader}
				bodyData={undefined}
				data-testid="table"
				isLoading
			/>,
		)
		const spinner = getByTestId('spinner')

		expect(spinner).toBeInTheDocument()
	})

	it('render no data found when is loading false and body data is undefined', () => {
		const { tableHeader } = generateTableData(15)
		const { getByTestId } = render(
			<Table
				headerLabels={tableHeader}
				bodyData={undefined}
				data-testid="table"
				isLoading={false}
			/>,
		)

		const noData = getByTestId('no-data')

		expect(noData).toContainHTML('Nenhum registro encontrado')
	})
})
