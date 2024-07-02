import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { v4 as uuid } from 'uuid'

export type TableHeaderProps = ComponentProps<'thead'> & {
	headerLabels: Array<{
		label: string
		accessor: string
	}>
}

export const TableHeader = ({
	headerLabels,
	className,
	...props
}: TableHeaderProps) => {
	return (
		<thead className={twMerge('bg-gray-50', className)} {...props}>
			<tr>
				{headerLabels?.map(({ label }) => (
					<th
						key={uuid()}
						scope="col"
						className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500"
					>
						{label}
					</th>
				))}
			</tr>
		</thead>
	)
}
