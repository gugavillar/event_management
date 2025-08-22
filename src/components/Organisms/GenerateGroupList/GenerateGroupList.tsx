'use client'
import dynamic from 'next/dynamic'
import { memo, useState } from 'react'

import { Button, Header, Modal, Select, Text } from '@/components/Atoms'
import { DownloadPDFProps } from '@/components/Templates'
import { overlayOpen } from '@/constants'

type GenerateGroupListProps = {
	modalId: string
	formattedGroups: DownloadPDFProps['groups']
}

const DownloadPDF = dynamic(() =>
	import('@/components/Templates').then((mod) => mod.DownloadPDF),
)

export const GenerateGroupList = memo(
	({ modalId, formattedGroups }: GenerateGroupListProps) => {
		const [listType, setListType] = useState<DownloadPDFProps['listType']>('')

		const handleClose = () => {
			setListType('')
		}

		const handleOpen = () => {
			overlayOpen(modalId)
		}

		return (
			<>
				<Button
					type="button"
					onClick={handleOpen}
					className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				>
					Gerar lista de grupos
				</Button>
				<Modal modalId={modalId} handleClose={handleClose}>
					<div className="flex flex-col items-center justify-center">
						<div className="flex w-full flex-col items-center justify-between gap-6">
							<div className="flex flex-col items-center gap-2">
								<Header as="h3" className="text-2xl">
									Selecione o tipo de lista
								</Header>
								<Text className="text-center">
									Selecione uma opção para gerar a lista, ao finalizar clique no
									botão para baixar o PDF
								</Text>
							</div>
							<Select
								className="w-full"
								options={[
									{ label: 'Selecione uma opção', value: '' },
									{ label: 'Detalhada', value: 'landscape' },
									{ label: 'Resumida', value: 'portrait' },
								]}
								value={listType}
								onChange={(e) =>
									setListType(e.target.value as DownloadPDFProps['listType'])
								}
							/>
							{listType && (
								<DownloadPDF groups={formattedGroups} listType={listType} />
							)}
						</div>
					</div>
				</Modal>
			</>
		)
	},
)

GenerateGroupList.displayName = 'GenerateGroupList'
