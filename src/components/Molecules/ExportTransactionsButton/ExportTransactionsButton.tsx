'use client'
import { FileDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/Atoms'
import { FILES_TYPES } from '@/constants'
import { useGetExportTransactionsData } from '@/services/queries/transactions/hooks'
import saveAs from 'file-saver'

const TOAST_ID = 'download-transactions'

type ExportTransactionsButtonProps = {
	eventId: string
	eventName: any
	transactionLength?: number
}

export const ExportTransactionsButton = ({
	eventId,
	eventName,
	transactionLength,
}: ExportTransactionsButtonProps) => {
	const [isDownload, setIsDownload] = useState(false)
	const { data, isError, isFetching } = useGetExportTransactionsData(
		eventId,
		transactionLength
	)

	useEffect(() => {
		if (!eventId || !isDownload) return

		if (isError) {
			toast.error('Erro ao baixar arquivo ou evento sem transações')
			setIsDownload(false)
			return
		}

		if (!data) return

		const blob = new Blob([data], {
			type: FILES_TYPES.xlsx,
		})
		saveAs(blob, `Transações-${eventName}.xlsx`)

		toast.dismiss(TOAST_ID)
		toast.success('Arquivo baixado com sucesso!')
		setIsDownload(false)
	}, [data, eventId, eventName, isDownload, isError])

	return (
		<Button
			className="max-w-sm min-w-60 items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			disabled={!transactionLength}
			isLoading={isFetching}
			leftIcon={<FileDown />}
			onClick={() => setIsDownload(true)}
		>
			Exportar
		</Button>
	)
}
