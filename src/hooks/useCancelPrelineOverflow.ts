'use client'

import { useEffect } from 'react'

export function useCancelPrelineOverflow() {
	useEffect(() => {
		const observer = new MutationObserver(() => {
			if (document.body.style.overflow === 'hidden') {
				document.body.style.overflow = ''
			}
		})

		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ['style'],
		})

		return () => observer.disconnect()
	}, [])
}
