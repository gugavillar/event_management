import { ComponentProps, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type HeaderProps<T extends ElementType> = ComponentProps<T> & {
	as?: HeadingElement
}

export const Header = <T extends HeadingElement>({
	as = 'h1',
	className,
	children,
	...props
}: HeaderProps<T>) => {
	const Component = as
	return (
		<Component
			className={twMerge('text-2xl font-bold text-stone-700', className)}
			{...props}
		>
			{children}
		</Component>
	)
}
