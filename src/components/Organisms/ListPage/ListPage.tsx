import { Search } from 'lucide-react'
import { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'

import { Field } from '@/components/Atoms'

type ListPageProps = ComponentProps<'div'> & {
	placeholderField?: string
	search?: string
	setSearch?: Dispatch<SetStateAction<string>>
	moreFilter?: ReactNode
	actionButton?: ReactNode
}

export const ListPage = ({
	placeholderField,
	children,
	moreFilter,
	actionButton,
	className,
	search,
	setSearch,
	...props
}: ListPageProps) => {
	return (
		<>
			<div
				className={twMerge(
					'flex flex-col items-center gap-8 lg:max-w-xl lg:flex-row',
					className,
				)}
				{...props}
			>
				{placeholderField && (
					<Field
						placeholder={placeholderField}
						rightIcon={<Search size={24} />}
						className="ps-11"
						value={search}
						onChange={(event) => setSearch?.(event.target.value)}
					/>
				)}
				{moreFilter || null}
				{actionButton || null}
			</div>
			{children}
		</>
	)
}
