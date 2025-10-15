import { type ComponentProps, memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { v4 as uuid } from 'uuid'

export type TableHeaderProps = ComponentProps<'thead'> & {
	headerLabels: Array<{
		label: string
		accessor: string
		className?: string
	}>
}

export const TableHeader = memo(
	({ headerLabels, className, ...props }: TableHeaderProps) => {
		return (
			<thead className={twMerge('bg-slate-800', className)} {...props}>
				<tr>
					{headerLabels?.map(({ label, className }) => (
						<th
							className={twMerge(
								'bg-slate-800 px-6 py-3 text-start text-xs font-medium text-nowrap text-gray-100 uppercase md:first:sticky md:first:left-0',
								className
							)}
							key={uuid()}
							scope="col"
						>
							{label}
						</th>
					))}
				</tr>
			</thead>
		)
	}
)

TableHeader.displayName = 'TableHeader'
