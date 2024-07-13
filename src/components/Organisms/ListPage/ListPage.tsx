import { ComponentProps, ReactNode } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

import { Field } from '@/components/Atoms'

type ListPageProps = ComponentProps<'div'> & {
	placeholderField: string
	moreFilter?: ReactNode
	actionButton?: ReactNode
}

export const ListPage = ({
	placeholderField,
	children,
	moreFilter,
	actionButton,
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
				<Field
					placeholder={placeholderField}
					rightIcon={<IoMdSearch size={24} />}
					className="ps-11"
				/>
				{moreFilter || null}
				{actionButton || null}
			</div>
			{children}
		</>
	)
}
