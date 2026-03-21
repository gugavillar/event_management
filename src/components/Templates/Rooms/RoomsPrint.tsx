'use client'

import { Document, Page, PDFDownloadLink, StyleSheet, Text, View } from '@react-pdf/renderer'
import { FileDown } from 'lucide-react'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { Spinner } from '@/components/Atoms'
import { generatePrintKey } from '@/constants'

import type { formatTableData } from './Rooms.utils'

export type RoomsPrintProps = {
	rooms: ReturnType<typeof formatTableData>
	listType: 'portrait' | 'landscape' | ''
	handleClose: VoidFunction
}

type DocumentsProps = {
	rooms: RoomsPrintProps['rooms']
}

const styles = StyleSheet.create({
	landscapeTableCell: {
		flex: 1,
		fontSize: 28,
		paddingHorizontal: 10,
		paddingVertical: 10,
		textAlign: 'center',
	},
	landscapeTitle: { fontSize: 72, fontWeight: 'bold', paddingBottom: 20, textAlign: 'center' },
	page: { padding: 20 },
	section: { marginBottom: 10 },
	tableCellLeft: {
		borderWidth: 1,
		fontSize: 14,
		justifyContent: 'center',
		minHeight: 20,
		paddingHorizontal: 5,
		paddingVertical: 4,
		width: '70%',
	},
	tableCellRight: {
		borderWidth: 1,
		fontSize: 14,
		justifyContent: 'center',
		minHeight: 20,
		paddingHorizontal: 5,
		paddingVertical: 4,
		width: '30%',
	},
	tableRow: { flexDirection: 'row' },
	title: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
})

const PortraitList = ({ rooms }: DocumentsProps) => {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{rooms.map((room) => (
					<View key={room.id} style={styles.section} wrap={false}>
						<Text style={styles.title}>Quarto {room.roomNumber}</Text>
						{room.members.map((member) => (
							<View key={member.id} style={styles.tableRow}>
								<Text style={styles.tableCellLeft}>{member.member}</Text>
								<Text style={styles.tableCellRight}>{member.type}</Text>
							</View>
						))}
					</View>
				))}
			</Page>
		</Document>
	)
}

const LandscapeList = ({ rooms }: DocumentsProps) => {
	return (
		<Document>
			{rooms.map((room) => (
				<Page key={room.id} orientation="landscape" size="A4" style={styles.page}>
					<View style={styles.section} wrap={false}>
						<Text style={styles.landscapeTitle}>{room.roomNumber}</Text>
						{room.members.map((member) => (
							<View key={member.id} style={styles.tableRow}>
								<Text style={styles.landscapeTableCell}>{member.member}</Text>
							</View>
						))}
					</View>
				</Page>
			))}
		</Document>
	)
}

export const RoomsPrint = ({ rooms, listType, handleClose }: RoomsPrintProps) => {
	const renderKey = useMemo(() => generatePrintKey(rooms, listType), [rooms, listType])

	if (!rooms.length) return null

	const fileName = listType === 'portrait' ? 'lista-de-quartos.pdf' : 'quartos-por-página.pdf'

	const handleClick = () => {
		toast.success('Arquivo baixado com sucesso!')
		setTimeout(handleClose, 1000)
	}

	return (
		<PDFDownloadLink
			className="inline-flex min-w-60 items-center justify-center gap-x-2 rounded-lg border border-transparent bg-teal-500 px-4 py-3 font-semibold text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 disabled:pointer-events-none disabled:opacity-50"
			document={listType === 'portrait' ? <PortraitList rooms={rooms} /> : <LandscapeList rooms={rooms} />}
			fileName={fileName}
			key={renderKey}
			onClick={handleClick}
		>
			{({ loading }) =>
				loading ? (
					<span className="flex items-center gap-x-2">
						<Spinner className="size-6" /> Gerando...
					</span>
				) : (
					<span className="flex items-center gap-x-2">
						<FileDown /> Export quartos
					</span>
				)
			}
		</PDFDownloadLink>
	)
}
