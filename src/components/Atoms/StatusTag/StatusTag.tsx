import { ComponentProps, memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { CHECK_IN_STATUS, StatusType } from '@/constants'

type StatusTag = ComponentProps<'mark'> & {
	status: CHECK_IN_STATUS
}

const STATUS_COLORS = {
	[CHECK_IN_STATUS.WITHDREW]: 'bg-red-400 bg-opacity-30',
	[CHECK_IN_STATUS.CONFIRMED]: 'bg-emerald-400 bg-opacity-30',
	[CHECK_IN_STATUS.NOT_ANSWERED]: 'bg-gray-400 bg-opacity-30',
}

export const StatusTag = memo(({ status, className, ...props }: StatusTag) => {
	return (
		<mark
			className={twMerge(
				'flex w-fit items-center justify-center rounded-3xl px-4 py-1 text-slate-800',
				className,
				STATUS_COLORS[status],
			)}
			{...props}
		>
			{StatusType[status].label}
		</mark>
	)
})

StatusTag.displayName = 'StatusTag'
