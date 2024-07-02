import { ComponentProps, ReactNode, isValidElement } from 'react'
import { twMerge } from 'tailwind-merge'
import { v4 as uuid } from 'uuid'

import { UUID } from 'crypto'

import { type TableHeaderProps } from './TableHeader'
type RowsData = Array<{
	id: UUID
	[key: TableHeaderProps['headerLabels'][number]['accessor']]:
		| string
		| number
		| ReactNode
}>

export type TableBodyProps = ComponentProps<'tbody'> & {
	headerLabels: TableHeaderProps['headerLabels']
	bodyData: RowsData
	handleClickRow?: (row: RowsData[number]) => void
}

export const TableBody = ({
	bodyData,
	headerLabels,
	className,
	handleClickRow,
	...props
}: TableBodyProps) => {
	return (
		<tbody
			className={twMerge('divide-y divide-gray-200', className)}
			{...props}
		>
			{bodyData?.map((data) => (
				<tr key={data?.id || uuid()} className="odd:bg-white even:bg-gray-100">
					{headerLabels?.map(({ accessor }) => {
						const isToApplyClassOrFunction =
							handleClickRow && !isValidElement(data[accessor])
						return (
							<td
								key={uuid()}
								className={twMerge(
									'whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800',
									isToApplyClassOrFunction && 'cursor-pointer',
								)}
								{...(isToApplyClassOrFunction && {
									onClick: () => handleClickRow(data),
								})}
							>
								{data[accessor]}
							</td>
						)
					})}
				</tr>
			))}
		</tbody>
	)
}
