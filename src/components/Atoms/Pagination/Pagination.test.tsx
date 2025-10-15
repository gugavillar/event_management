import { fireEvent, render, screen } from '@testing-library/react'

import { Pagination } from './Pagination'
import { usePagination } from './Pagination.utils'

jest.mock('./Pagination.utils', () => ({
	usePagination: jest.fn(),
}))

const mockedUsePagination = usePagination as jest.Mock

describe('Pagination component', () => {
	const setPage = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('is prev button disabled on first page', () => {
		mockedUsePagination.mockReturnValue([1, 2, 3])
		render(<Pagination currentPage={1} setPage={setPage} totalPages={3} />)

		const prevButton = screen.getByRole('button', { name: /previous/i })
		expect(prevButton).toBeDisabled()

		const nextButton = screen.getByRole('button', { name: /next/i })
		expect(nextButton).not.toBeDisabled()
	})

	it('is next button disabled on last page', () => {
		mockedUsePagination.mockReturnValue([1, 2, 3])
		render(<Pagination currentPage={3} setPage={setPage} totalPages={3} />)

		const nextButton = screen.getByRole('button', { name: /next/i })
		expect(nextButton).toBeDisabled()

		const prevButton = screen.getByRole('button', { name: /previous/i })
		expect(prevButton).not.toBeDisabled()
	})

	it('is renders pages buttons', () => {
		mockedUsePagination.mockReturnValue([1, 2, 3, 4])
		render(<Pagination currentPage={2} setPage={setPage} totalPages={4} />)

		expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument()
	})

	it('current page is active', () => {
		mockedUsePagination.mockReturnValue([1, 2, 3])
		render(<Pagination currentPage={2} setPage={setPage} totalPages={3} />)

		const activeButton = screen.getByRole('button', { name: '2' })
		expect(activeButton).toHaveClass('bg-teal-500 text-white')
	})

	it('call setPage when click page button', () => {
		mockedUsePagination.mockReturnValue([1, 2, 3])
		render(<Pagination currentPage={1} setPage={setPage} totalPages={3} />)

		fireEvent.click(screen.getByRole('button', { name: '2' }))
		expect(setPage).toHaveBeenCalledWith(2)
	})

	it('call setPage when click prev or next button', async () => {
		mockedUsePagination.mockReturnValue([1, 2, 3])
		render(<Pagination currentPage={2} setPage={setPage} totalPages={3} />)

		fireEvent.click(screen.getByRole('button', { name: /previous/i }))
		fireEvent.click(screen.getByRole('button', { name: /next/i }))

		expect(setPage).toHaveBeenCalledWith(1)
		expect(setPage).toHaveBeenCalledWith(3)
	})
})
