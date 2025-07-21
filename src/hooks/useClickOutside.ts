'use client'
import { RefObject, useCallback, useEffect } from 'react'

type UseClickOutsideArgs = {
	isOpen: boolean
	toggle: () => void
	containerRef:
		| RefObject<HTMLButtonElement | null>
		| RefObject<HTMLDivElement | null>
}

export const useClickOutside = ({
	isOpen,
	toggle,
	containerRef,
}: UseClickOutsideArgs) => {
	const handleClickOutside = useCallback(
		(event: any) => {
			if (
				containerRef.current &&
				!containerRef.current?.contains(event.target) &&
				isOpen
			) {
				toggle()
			}
		},
		[containerRef, isOpen, toggle],
	)

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)

		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [handleClickOutside, isOpen])
}
