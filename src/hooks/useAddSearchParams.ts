'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

type QueryParams = Record<string, string | undefined | null>

export const useAddSearchParams = (paramsToSync: QueryParams) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString())

		Object.entries(paramsToSync).forEach(([key, value]) => {
			if (value) {
				params.set(key, value)
			} else {
				params.delete(key)
			}
		})

		const queryString = params.toString()
		const newUrl = queryString ? `${pathname}?${queryString}` : pathname

		window.history.replaceState({}, '', newUrl)
	}, [paramsToSync, pathname, searchParams])
}
