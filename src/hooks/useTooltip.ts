'use client'
import { useEffect } from 'react'

export const useTooltip = (active: boolean) => {
	useEffect(() => {
		const load = async () => {
			if (typeof window === 'undefined') return

			if (active) return

			const { HSTooltip } = await import('preline/preline')
			HSTooltip.autoInit()
		}
		load()
	}, [active])
}
