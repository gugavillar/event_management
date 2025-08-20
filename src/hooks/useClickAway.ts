import { useEffect, useRef } from 'react'

type Event = MouseEvent | TouchEvent

export const useClickAway = <T extends HTMLElement | null>(
	ref: React.RefObject<T>,
	onClickAway: (event: Event) => void,
) => {
	const savedCallback = useRef(onClickAway)

	useEffect(() => {
		savedCallback.current = onClickAway
	}, [onClickAway])

	useEffect(() => {
		function handler(event: Event) {
			const el = ref?.current
			if (el && !el.contains(event.target as Node)) {
				savedCallback.current(event)
			}
		}

		document.addEventListener('mousedown', handler)
		document.addEventListener('touchstart', handler)

		return () => {
			document.removeEventListener('mousedown', handler)
			document.removeEventListener('touchstart', handler)
		}
	}, [ref])
}
