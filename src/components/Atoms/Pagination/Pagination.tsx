'use client'
import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

import type { PageButtonProps, PaginationProps } from './Pagination.types'
import { usePagination } from './Pagination.utils'

const SpreadButton = () => {
	return (
		<div className="inline-block">
			<button
				className="flex min-h-9 min-w-9 items-center justify-center px-3 py-2 text-sm text-gray-800 first:rounded-s-lg last:rounded-e-lg focus:bg-gray-300 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
				type="button"
			>
				<Ellipsis size={20} />
			</button>
		</div>
	)
}

const PageButton = ({ label, setPage, isActive }: PageButtonProps) => {
	return (
		<button
			aria-current="page"
			className={twMerge(
				'flex min-h-9 min-w-9 cursor-pointer items-center justify-center border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm first:rounded-s-lg last:rounded-e-lg hover:bg-gray-200 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50',
				isActive &&
					'border-none bg-teal-500 text-white hover:bg-teal-500 hover:text-white'
			)}
			onClick={() => setPage(label)}
			type="button"
		>
			{label}
		</button>
	)
}

export const Pagination = memo(
	({ currentPage, totalPages = 1, setPage }: PaginationProps) => {
		const isFirstPage = currentPage === 1
		const isLastPage = currentPage === totalPages
		const paginationValues = usePagination({
			currentPage,
			siblingCount: 1,
			totalPages,
		})
		return (
			<nav
				aria-label="Pagination"
				className="flex w-full items-center justify-center gap-3 -space-x-px"
			>
				<button
					aria-label="Previous"
					className="inline-flex min-h-9 min-w-9 cursor-pointer items-center justify-center gap-x-1.5 px-2.5 py-2 text-sm text-gray-800 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isFirstPage}
					onClick={() => setPage(currentPage - 1)}
					type="button"
				>
					<ChevronLeft size={18} />
					<span className="hidden md:block">Anterior</span>
				</button>
				<div className="flex items-center gap-x-1">
					{paginationValues?.map((page, index) =>
						page === '...' ? (
							<SpreadButton key={index} />
						) : (
							<PageButton
								isActive={page === currentPage}
								key={index}
								label={page as number}
								setPage={setPage}
							/>
						)
					)}
				</div>
				<button
					aria-label="Next"
					className="inline-flex min-h-9 min-w-9 cursor-pointer items-center justify-center gap-x-1.5 px-2.5 py-2 text-sm text-gray-800 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isLastPage}
					onClick={() => setPage(currentPage + 1)}
					type="button"
				>
					<span className="hidden md:block">Próxima</span>
					<ChevronRight size={18} />
				</button>
			</nav>
		)
	}
)

Pagination.displayName = 'Pagination'
