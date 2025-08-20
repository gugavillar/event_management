import { ComponentProps, memo } from 'react'
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
							key={uuid()}
							scope="col"
							className={twMerge(
								'px-6 py-3 text-start text-xs font-medium text-gray-100 uppercase',
								className,
							)}
						>
							{label}
						</th>
					))}
				</tr>
			</thead>
		)
	},
)

TableHeader.displayName = 'TableHeader'
