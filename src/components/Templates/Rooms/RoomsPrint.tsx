'use client'

import { Document, Page, PDFDownloadLink, StyleSheet, Text, View } from '@react-pdf/renderer'
import { FileDown } from 'lucide-react'
import { useMemo } from 'react'

import { Spinner } from '@/components/Atoms'
import { generatePrintKey } from '@/constants'

import type { formatTableData } from './Rooms.utils'

type DownloadPDFProps = {
	rooms: ReturnType<typeof formatTableData>
}

const styles = StyleSheet.create({
	page: { padding: 20 },
	section: { marginBottom: 10 },
	tableCellLeft: {
		borderWidth: 0.5,
		fontSize: 14,
		paddingHorizontal: 5,
		paddingVertical: 2,
		width: '70%',
	},
	tableCellRight: {
		borderWidth: 0.5,
		fontSize: 14,
		paddingHorizontal: 5,
		paddingVertical: 2,
		width: '30%',
	},
	tableRow: { flexDirection: 'row' },
	title: { fontSize: 16, fontWeight: 'bold', paddingBottom: 5 },
})

const MyDocument = ({ rooms }: DownloadPDFProps) => {
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

export const DownloadPDF = ({ rooms }: DownloadPDFProps) => {
	const renderKey = useMemo(() => generatePrintKey(rooms), [rooms])

	if (!rooms.length) return null

	return (
		<PDFDownloadLink
			className="inline-flex min-w-60 items-center justify-center gap-x-2 rounded-lg border border-transparent bg-teal-500 px-4 py-3 text-base font-semibold text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 disabled:pointer-events-none disabled:opacity-50"
			document={<MyDocument rooms={rooms} />}
			fileName="quartos.pdf"
			key={renderKey}
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
