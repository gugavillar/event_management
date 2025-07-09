'use client'

import {
	PDFDownloadLink,
	Page,
	View,
	Document,
	StyleSheet,
	Text,
} from '@react-pdf/renderer'
import { FileDown } from 'lucide-react'

import { Spinner } from '@/components/Atoms'

import { formatTableData } from './Groups.utils'

type DownloadPDFProps = {
	groups: ReturnType<typeof formatTableData>
}

const styles = StyleSheet.create({
	page: { padding: 20 },
	section: { marginBottom: 10 },
	tableRow: { flexDirection: 'row' },
	title: { fontSize: 16, paddingBottom: 5, fontWeight: 'bold' },
	tableCellLeft: {
		width: '70%',
		borderWidth: 0.5,
		fontSize: 14,
		paddingHorizontal: 5,
		paddingVertical: 2,
	},
	tableCellRight: {
		width: '30%',
		borderWidth: 0.5,
		fontSize: 14,
		paddingHorizontal: 5,
		paddingVertical: 2,
	},
})

const MyDocument = ({ groups }: DownloadPDFProps) => {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{groups.map((group) => (
					<View key={group.id} style={styles.section} wrap={false}>
						<Text style={styles.title}>{group.name}</Text>
						{group.members.map((member) => (
							<View style={styles.tableRow} key={member.id}>
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

export const DownloadPDF = ({ groups }: DownloadPDFProps) => {
	if (!groups.length) return null

	return (
		<PDFDownloadLink
			className="inline-flex min-w-60 items-center justify-center gap-x-2 rounded-lg border border-transparent bg-teal-500 px-4 py-3 text-base font-semibold text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 disabled:pointer-events-none disabled:opacity-50"
			document={<MyDocument groups={groups} />}
			fileName="grupos.pdf"
		>
			{({ loading }) =>
				loading ? (
					<span className="flex items-center gap-x-2">
						<Spinner className="size-6" /> Gerando...
					</span>
				) : (
					<span className="flex items-center gap-x-2">
						<FileDown /> Export grupos
					</span>
				)
			}
		</PDFDownloadLink>
	)
}
