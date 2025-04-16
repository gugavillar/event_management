'use client'
import { saveAs } from 'file-saver'
import { useEffect, useState } from 'react'
import { BsFiletypeXls } from 'react-icons/bs'

import { Button } from '@/components/Atoms'
import { FILES_TYPES } from '@/constants'
import { useGetParticipantsTemplateFile } from '@/services/queries/participants'

export const DownloadTemplateParticipantsButton = () => {
	const [startDownload, setStartDownload] = useState(false)
	const { data, isFetching } = useGetParticipantsTemplateFile(startDownload)

	const handleClick = async () => {
		setStartDownload(true)
	}

	useEffect(() => {
		if (!data || !startDownload) return

		const blob = new Blob([data as BlobPart], {
			type: FILES_TYPES.xlsx,
		})
		saveAs(blob, 'template_participantes.xlsx')
		setStartDownload(false)
	}, [data, startDownload])

	return (
		<Button
			className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			leftIcon={<BsFiletypeXls />}
			onClick={handleClick}
			isLoading={isFetching}
		>
			Download template
		</Button>
	)
}
