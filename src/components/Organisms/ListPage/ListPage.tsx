import { ComponentProps, ReactNode } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

import { Field, Select, Table, TableProps } from '@/components/Atoms'

type ListPageProps = ComponentProps<'div'> & {
	bodyData: TableProps['bodyData']
	headerLabels: TableProps['headerLabels']
	placeholderField: string
	children?: ReactNode
}
export const ListPage = ({
	bodyData,
	headerLabels,
	placeholderField,
	children,
	className,
	...props
}: ListPageProps) => {
	return (
		<>
			<div
				className={twMerge(
					'flex flex-col gap-8 lg:max-w-xl lg:flex-row',
					className,
				)}
				{...props}
			>
				<Select
					defaultValue=""
					placeholder="Selecione o evento"
					options={[
						{ label: 'Evento 1', value: '1' },
						{ label: 'Evento 2', value: '2' },
					]}
				/>
				{children || null}
				<Field
					placeholder={placeholderField}
					rightIcon={<IoMdSearch size={24} />}
					className="ps-11"
				/>
			</div>
			<Table headerLabels={headerLabels} bodyData={bodyData} />
		</>
	)
}
