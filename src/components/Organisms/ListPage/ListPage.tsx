import { Search } from 'lucide-react'
import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
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
			<div className={twMerge('flex flex-row items-center gap-4 lg:max-w-xl', className)} {...props}>
				{placeholderField && (
					<Field
						className="ps-11"
						onChange={(event) => setSearch?.(event.target.value)}
						placeholder={placeholderField}
						rightIcon={<Search size={24} />}
						value={search}
					/>
				)}
				{moreFilter || null}
				{actionButton || null}
			</div>
			{children}
		</>
	)
}
