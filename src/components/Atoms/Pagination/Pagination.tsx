import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

import { PageButtonProps, PaginationProps } from './Pagination.types'
import { usePagination } from './Pagination.utils'

const SpreadButton = () => {
	return (
		<div className="inline-block">
			<button
				type="button"
				className="focus:outline-hidden flex min-h-9 min-w-9 items-center justify-center px-3 py-2 text-sm text-gray-800 first:rounded-s-lg last:rounded-e-lg focus:bg-gray-300 disabled:pointer-events-none disabled:opacity-50"
			>
				<MdOutlineMoreHoriz size={20} />
			</button>
		</div>
	)
}

const PageButton = ({ label, setPage, isActive }: PageButtonProps) => {
	return (
		<button
			type="button"
			className={twMerge(
				'focus:outline-hidden flex min-h-9 min-w-9 items-center justify-center border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm first:rounded-s-lg last:rounded-e-lg hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50',
				isActive &&
					'bg-jungle-green-200 text-jungle-green-800 hover:bg-jungle-green-200 hover:text-jungle-green-800',
			)}
			aria-current="page"
			onClick={() => setPage(label)}
		>
			{label}
		</button>
	)
}

export const Pagination = ({
	currentPage,
	totalPages,
	setPage,
}: PaginationProps) => {
	const isFirstPage = currentPage === 1
	const isLastPage = currentPage === totalPages
	const paginationValues = usePagination({
		totalPages,
		currentPage,
		siblingCount: 1,
	})
	return (
		<nav
			className="flex w-full items-center justify-center -space-x-px"
			aria-label="Pagination"
		>
			<button
				type="button"
				className="focus:outline-hidden inline-flex min-h-9 min-w-9 items-center justify-center gap-x-1.5 px-2.5 py-2 text-sm text-gray-800 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="Previous"
				disabled={isFirstPage}
				onClick={() => setPage(currentPage - 1)}
			>
				<FaChevronLeft size={14} />
				<span>Anterior</span>
			</button>
			<div className="flex items-center gap-x-1">
				{paginationValues?.map((page, index) =>
					page === '...' ? (
						<SpreadButton key={index} />
					) : (
						<PageButton
							label={page as number}
							key={index}
							setPage={setPage}
							isActive={page === currentPage}
						/>
					),
				)}
			</div>
			<button
				type="button"
				className="focus:outline-hidden inline-flex min-h-9 min-w-9 items-center justify-center gap-x-1.5 px-2.5 py-2 text-sm text-gray-800 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="Next"
				disabled={isLastPage}
				onClick={() => setPage(currentPage + 1)}
			>
				<span>Próxima</span>
				<FaChevronRight size={14} />
			</button>
		</nav>
	)
}
