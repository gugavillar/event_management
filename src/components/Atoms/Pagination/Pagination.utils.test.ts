import { renderHook } from '@testing-library/react'

import { usePagination } from './Pagination.utils'

describe('Pagination utils', () => {
	it('renders total pages numbers correctly', () => {
		const { result } = renderHook(() =>
			usePagination({ totalPages: 5, currentPage: 1, siblingCount: 1 }),
		)
		expect(result.current).toEqual([1, 2, 3, 4, 5])
	})

	it('renders dots in right side when needed', () => {
		const { result } = renderHook(() =>
			usePagination({
				totalPages: 10,
				currentPage: 1,
				siblingCount: 1,
			}),
		)
		expect(result.current).toEqual([1, 2, 3, 4, 5, '...', 10])
	})

	it('renders dots in left side when needed', () => {
		const { result } = renderHook(() =>
			usePagination({
				totalPages: 10,
				currentPage: 10,
				siblingCount: 1,
			}),
		)
		expect(result.current).toEqual([1, '...', 6, 7, 8, 9, 10])
	})

	it('renders dots in the middle when needed', () => {
		const { result } = renderHook(() =>
			usePagination({
				totalPages: 10,
				currentPage: 5,
				siblingCount: 1,
			}),
		)
		expect(result.current).toEqual([1, '...', 4, 5, 6, '...', 10])
	})

	it('renders correctly when siblingCount is 2', () => {
		const { result } = renderHook(() =>
			usePagination({
				totalPages: 20,
				currentPage: 5,
				siblingCount: 2,
			}),
		)
		expect(result.current).toEqual([1, '...', 3, 4, 5, 6, 7, '...', 20])
	})
})
