import { ComponentProps, memo } from 'react'
import { twMerge } from 'tailwind-merge'

type FunctionTagProps = ComponentProps<'mark'> & {
	status?: string
	isLeader?: boolean
}

export const FunctionTag = memo(
	({ status, isLeader, className, ...props }: FunctionTagProps) => {
		return (
			<mark
				className={twMerge(
					'flex w-fit items-center justify-center gap-x-1.5 rounded-3xl bg-gray-400 bg-opacity-30 px-4 py-1.5 text-slate-800',
					!status
						? 'bg-gray-400 bg-opacity-30'
						: 'bg-emerald-400 bg-opacity-30',
					className,
				)}
				{...props}
			>
				{isLeader && (
					<span className="inline-block size-2 rounded-full bg-emerald-800"></span>
				)}
				{status ?? 'Sem função'}
			</mark>
		)
	},
)

FunctionTag.displayName = 'FunctionTag'
