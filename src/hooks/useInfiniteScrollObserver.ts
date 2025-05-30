import { useCallback, useRef } from 'react'

type UseInfiniteScrollObserverParams = {
	hasNextPage: boolean
	isFetchingNextPage: boolean
	fetchNextPage: () => void
}

export const useInfiniteScrollObserver = ({
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
}: UseInfiniteScrollObserverParams) => {
	const observerRef = useRef<IntersectionObserver | null>(null)

	const lastItemRef = useCallback(
		(node: Element | null) => {
			if (isFetchingNextPage) return
			if (observerRef.current) observerRef.current.disconnect()

			observerRef.current = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting && hasNextPage) {
					fetchNextPage()
				}
			})

			if (node) observerRef.current.observe(node)
		},
		[hasNextPage, isFetchingNextPage, fetchNextPage],
	)

	return lastItemRef
}
