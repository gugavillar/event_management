import { Dispatch, SetStateAction } from 'react'

export type PaginationProps = {
	totalPages: number
	currentPage: number
	setPage: Dispatch<SetStateAction<number>>
}

export type PageButtonProps = {
	label: number
	setPage: Dispatch<SetStateAction<number>>
	isActive: boolean
}
