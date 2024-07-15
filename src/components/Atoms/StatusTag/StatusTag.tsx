import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { StatusType, StatusTypeAPI } from '@/constants'

type StatusTag = ComponentProps<'mark'> & {
	status: StatusTypeAPI
}

const STATUS_COLORS = {
	[StatusTypeAPI.NOT_CONFIRMED]: 'bg-red-400 bg-opacity-30',
	[StatusTypeAPI.CONFIRMED]: 'bg-emerald-400 bg-opacity-30',
}

export const StatusTag = ({ status, className, ...props }: StatusTag) => {
	return (
		<mark
			className={twMerge(
				'flex w-32 items-center justify-center rounded-3xl px-4 py-1 text-slate-800',
				className,
				STATUS_COLORS[status],
			)}
			{...props}
		>
			{StatusType[status].label}
		</mark>
	)
}
