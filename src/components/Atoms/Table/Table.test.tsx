import { fireEvent, render } from '@testing-library/react'

import type { UUID } from 'crypto'

import { faker } from '@faker-js/faker'
import { Table } from './Table'

const generateTableData = (length: number) => {
	const tableData = Array.from({ length }, () => ({
		action: <button>Button</button>,
		birthdate: faker.date.birthdate().getUTCDate(),
		email: faker.internet.email(),
		id: faker.string.uuid() as UUID,
		name: faker.person.fullName(),
		phone: faker.phone.number(),
	}))

	const tableFields = Object.keys(tableData[0])

	const tableHeader = tableFields.map((field) => ({
		accessor: field,
		label: field,
	}))

	return { tableData, tableHeader }
}

describe('Table component', () => {
	it('renders correctly', () => {
		const { tableHeader, tableData } = generateTableData(15)
		const { getByTestId } = render(
			<Table
				bodyData={tableData}
				data-testid="table"
				headerLabels={tableHeader}
				isLoading={false}
			/>
		)

		expect(getByTestId('table')).toBeInTheDocument()
	})

	it('applies custom class name', () => {
		const { tableHeader, tableData } = generateTableData(15)
		const { getByTestId } = render(
			<Table
				bodyData={tableData}
				className="custom-class"
				data-testid="table"
				headerLabels={tableHeader}
				isLoading={false}
			/>
		)
		expect(getByTestId('table')).toHaveClass('custom-class')
	})

	it('applies custom props', () => {
		const { tableHeader, tableData } = generateTableData(15)
		const { getByTestId } = render(
			<Table
				bodyData={tableData}
				data-testid="table"
				headerLabels={tableHeader}
				isLoading={false}
				width={150}
			/>
		)
		expect(getByTestId('table')).toHaveAttribute('width', '150')
	})

	it('handle click function called when click in column data', () => {
		const handleClick = jest.fn()
		const { tableHeader, tableData } = generateTableData(15)
		const { getByTestId } = render(
			<Table
				bodyData={tableData}
				data-testid="table"
				handleClickRow={(row) => handleClick(row)}
				headerLabels={tableHeader}
				isLoading={false}
			/>
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
				bodyData={tableData}
				data-testid="table"
				handleClickRow={(row) => handleClick(row)}
				headerLabels={tableHeader}
				isLoading={false}
			/>
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
				bodyData={tableData}
				data-testid="table"
				handleClickRow={(row) => handleClick(row)}
				headerLabels={tableHeader}
				isLoading={false}
			/>
		)

		const row = getByTestId('table').querySelectorAll('tbody tr')[randomIndex]

		fireEvent.click(row.lastChild as HTMLElement)

		expect(handleClick).not.toHaveBeenCalled()
	})

	it('render spinner when is loading true and table data is undefined', () => {
		const { tableHeader } = generateTableData(15)
		const { getByTestId } = render(
			<Table
				bodyData={undefined}
				data-testid="table"
				headerLabels={tableHeader}
				isLoading
			/>
		)
		const spinner = getByTestId('spinner')

		expect(spinner).toBeInTheDocument()
	})

	it('render no data found when is loading false and body data is undefined', () => {
		const { tableHeader } = generateTableData(15)
		const { getByTestId } = render(
			<Table
				bodyData={undefined}
				data-testid="table"
				headerLabels={tableHeader}
				isLoading={false}
			/>
		)

		const noData = getByTestId('no-data')

		expect(noData).toContainHTML('Nenhum registro encontrado')
	})
})
