import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type FunctionTagProps = ComponentProps<'mark'> & {
	status?: string
}

export const FunctionTag = ({
	status,
	className,
	...props
}: FunctionTagProps) => {
	return (
		<mark
			className={twMerge(
				'flex w-fit items-center justify-center rounded-3xl bg-gray-400 bg-opacity-30 px-4 py-1 text-slate-800',
				!status ? 'bg-gray-400 bg-opacity-30' : 'bg-emerald-400 bg-opacity-30',
				className,
			)}
			{...props}
		>
			{status ?? 'Sem função'}
		</mark>
	)
}
