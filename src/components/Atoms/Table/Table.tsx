import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { TableBody, TableBodyProps } from './TableBody'
import { TableHeader, TableHeaderProps } from './TableHeader'

export type TableProps = ComponentProps<'table'> &
	TableHeaderProps &
	TableBodyProps

export const Table = ({
	headerLabels,
	bodyData,
	handleClickRow,
	className,
	isLoading,
	...props
}: TableProps) => {
	return (
		<div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 shadow-md">
			<table
				className={twMerge('min-w-full divide-y divide-gray-200', className)}
				{...props}
			>
				<TableHeader headerLabels={headerLabels} />
				<TableBody
					bodyData={bodyData}
					headerLabels={headerLabels}
					handleClickRow={handleClickRow}
					isLoading={isLoading}
				/>
			</table>
		</div>
	)
}
