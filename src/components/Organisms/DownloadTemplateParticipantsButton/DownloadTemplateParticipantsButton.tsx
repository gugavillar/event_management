'use client'
import { saveAs } from 'file-saver'
import { FileDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/Atoms'
import { FILES_TYPES } from '@/constants'
import { useGetParticipantsTemplateFile } from '@/services/queries/participants'

const TOAST_ID = 'download-template-participants'

export const DownloadTemplateParticipantsButton = () => {
	const [startDownload, setStartDownload] = useState(false)
	const { data, isError, isFetching } =
		useGetParticipantsTemplateFile(startDownload)

	const handleClick = async () => {
		toast.loading('Gerando arquivo...', { id: TOAST_ID })
		setStartDownload(true)
	}

	useEffect(() => {
		if (!data || !startDownload) return

		if (isError) {
			toast.error('Erro ao baixar arquivo')
			setStartDownload(false)
			return
		}

		const blob = new Blob([data], {
			type: FILES_TYPES.xlsx,
		})
		saveAs(blob, 'template_participantes.xlsx')
		setStartDownload(false)
		toast.dismiss(TOAST_ID)
		toast.success('Arquivo baixado com sucesso!')
	}, [data, isError, startDownload])

	return (
		<Button
			className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			leftIcon={<FileDown />}
			onClick={handleClick}
			isLoading={isFetching}
		>
			Download template
		</Button>
	)
}
