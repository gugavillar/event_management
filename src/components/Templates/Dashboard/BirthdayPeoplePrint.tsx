'use client'

import { Document, Page, PDFDownloadLink, StyleSheet, Text, View } from '@react-pdf/renderer'
import { FileDown } from 'lucide-react'
import { useMemo } from 'react'

import { Spinner } from '@/components/Atoms'

import type { formatTableData } from './Dashboard.utils'

type DownloadPDFProps = {
	birthdayPeople: ReturnType<typeof formatTableData>
}

const baseCell = {
	borderWidth: 1,
	fontSize: 12,
	justifyContent: 'center',
	paddingHorizontal: 6,
	paddingVertical: 4,
} as const

const styles = StyleSheet.create({
	page: { padding: 20 },
	section: { marginBottom: 12 },
	tableCellLeft: {
		...baseCell,
		width: '70%',
	},
	tableCellRight: {
		...baseCell,
		textAlign: 'center',
		width: '30%',
	},
	tableRow: { flexDirection: 'row' },
	title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
})

const MyDocument = ({ birthdayPeople }: DownloadPDFProps) => {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.section} wrap={false}>
					<Text style={styles.title}>Aniversariantes</Text>
					{birthdayPeople.map((birth) => (
						<View key={birth.id} style={styles.tableRow}>
							<Text style={styles.tableCellLeft}>{birth.name}</Text>
							<Text style={styles.tableCellRight}>{birth.birthdate}</Text>
						</View>
					))}
				</View>
			</Page>
		</Document>
	)
}

export const DownloadPDF = ({ birthdayPeople }: DownloadPDFProps) => {
	const renderKey = useMemo(() => birthdayPeople.map((birth) => `${birth.id}`).join('|'), [birthdayPeople])

	if (!birthdayPeople.length) return null

	return (
		<PDFDownloadLink
			className="inline-flex min-w-60 items-center justify-center gap-x-2 rounded-lg border border-transparent bg-teal-500 px-4 py-3 font-semibold text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 disabled:pointer-events-none disabled:opacity-50"
			document={<MyDocument birthdayPeople={birthdayPeople} />}
			fileName="aniversariantes.pdf"
			key={renderKey}
		>
			{({ loading }) =>
				loading ? (
					<span className="flex items-center gap-x-2">
						<Spinner className="size-6" /> Gerando...
					</span>
				) : (
					<span className="flex items-center gap-x-2">
						<FileDown /> Export aniversariantes
					</span>
				)
			}
		</PDFDownloadLink>
	)
}
