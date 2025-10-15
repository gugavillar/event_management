import { type ComponentProps, memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { USER_STATUS } from '@/constants'

type UserTagProps = ComponentProps<'mark'> & {
	status: USER_STATUS
}

const STATUS_COLORS = {
	[USER_STATUS.INACTIVE]: 'bg-red-400/30',
	[USER_STATUS.ACTIVE]: 'bg-emerald-400/30',
}

export const UserTag = memo(({ status, className, ...props }: UserTagProps) => {
	return (
		<mark
			className={twMerge(
				'flex w-fit min-w-36 items-center justify-center rounded-3xl px-4 py-1 text-slate-800',
				className,
				STATUS_COLORS[status]
			)}
			{...props}
		>
			{status}
		</mark>
	)
})

UserTag.displayName = 'UserTag'
