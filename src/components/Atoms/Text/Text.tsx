import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

type TextElement = 'span' | 'p'

type TextProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
	as?: TextElement
}

export const Text = <T extends TextElement>({
	as = 'p',
	className,
	children,
	...props
}: TextProps<T>) => {
	const Component = as
	return (
		<Component className={twMerge('text-gray-800', className)} {...props}>
			{children}
		</Component>
	)
}
