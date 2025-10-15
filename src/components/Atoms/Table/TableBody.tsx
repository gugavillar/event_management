import type { UUID } from 'crypto'
import { type ComponentProps, isValidElement, type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { v4 as uuid } from 'uuid'

import { Spinner } from '../Spinner'
import type { TableHeaderProps } from './TableHeader'

type HeaderAccessor = Extract<TableHeaderProps['headerLabels'][number]['accessor'], string>

type RowsData = Array<
	{
		id: UUID
		backgroundColor?: string
	} & {
		[K in Exclude<HeaderAccessor, 'backgroundColor'>]: string | number | ReactNode
	}
>

export type TableBodyProps = ComponentProps<'tbody'> & {
	headerLabels: TableHeaderProps['headerLabels']
	bodyData?: RowsData
	isLoading: boolean
	handleClickRow?: (row: RowsData[number]) => void
}

export const TableBody = ({
	bodyData,
	headerLabels,
	className,
	handleClickRow,
	isLoading,
	...props
}: TableBodyProps) => {
	return (
		<tbody className={twMerge('divide-y divide-gray-200', className)} {...props}>
			{!bodyData || !bodyData?.length ? (
				<tr>
					<td className="place-items-center py-36 text-center" colSpan={headerLabels.length} data-testid="no-data">
						{isLoading ? <Spinner data-testid="spinner" /> : 'Nenhum registro encontrado'}
					</td>
				</tr>
			) : (
				bodyData?.map(({ backgroundColor, ...data }) => (
					<tr
						className={twMerge('odd:bg-slate-50 even:bg-slate-100 hover:bg-slate-200')}
						key={data?.id}
						style={{ backgroundColor }}
					>
						{headerLabels?.map(({ accessor }) => {
							const isToApplyClassOrFunction = handleClickRow && !isValidElement(data[accessor])
							return (
								<td
									className={twMerge(
										'px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800 md:first:sticky md:first:left-0 md:first:bg-inherit',
										isToApplyClassOrFunction && 'cursor-pointer'
									)}
									key={uuid()}
									style={{ backgroundColor }}
									{...(isToApplyClassOrFunction && {
										onClick: () => handleClickRow(data),
									})}
								>
									{data[accessor]}
								</td>
							)
						})}
					</tr>
				))
			)}
		</tbody>
	)
}
