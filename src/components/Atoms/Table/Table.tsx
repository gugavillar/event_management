import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { TableBody, type TableBodyProps } from './TableBody'
import { TableHeader, type TableHeaderProps } from './TableHeader'

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
					handleClickRow={handleClickRow}
					headerLabels={headerLabels}
					isLoading={isLoading}
				/>
			</table>
		</div>
	)
}
