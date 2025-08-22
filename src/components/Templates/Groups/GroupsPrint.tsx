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
import { useMemo } from 'react'

import { Spinner } from '@/components/Atoms'
import { generatePrintKey } from '@/constants'

import { formatTableData } from './Groups.utils'

export type DownloadPDFProps = {
	groups: ReturnType<typeof formatTableData>
	listType: 'portrait' | 'landscape' | ''
}

type DocumentsProps = {
	groups: DownloadPDFProps['groups']
}

const styles = StyleSheet.create({
	page: { padding: 20 },
	section: { marginBottom: 10 },
	tableRow: { flexDirection: 'row' },
	title: { fontSize: 16, paddingBottom: 5, fontWeight: 'bold' },
	tableCell: {
		width: '70%',
		borderWidth: 0.5,
		fontSize: 14,
		paddingHorizontal: 5,
		paddingVertical: 2,
	},
	tableCellPhoneAndBirthdate: {
		width: '30%',
		borderWidth: 0.5,
		fontSize: 14,
		paddingHorizontal: 5,
		paddingVertical: 2,
	},
	tableCellMemberType: {
		width: '30%',
		borderWidth: 0.5,
		fontSize: 14,
		paddingHorizontal: 5,
		paddingVertical: 2,
	},
})

const PortraitList = ({ groups }: DocumentsProps) => {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{groups.map((group) => (
					<View key={group.id} style={styles.section} wrap={false}>
						<Text style={styles.title}>
							{group.name} - Quantidade de membros: {group.members.length}
						</Text>
						{group.members.map((member) => (
							<View style={styles.tableRow} key={member.id}>
								<Text style={styles.tableCell}>{member.member}</Text>
								<Text style={styles.tableCellMemberType}>{member.type}</Text>
							</View>
						))}
					</View>
				))}
			</Page>
		</Document>
	)
}

const LandscapeList = ({ groups }: DocumentsProps) => {
	return (
		<Document>
			{groups.map((group) => (
				<Page
					key={group.id}
					size="A4"
					orientation="landscape"
					style={styles.page}
				>
					<View style={styles.section} wrap={false}>
						<Text style={styles.title}>
							{group.name} - Quantidade de membros: {group.members.length}
						</Text>
						{group.members.map((member) => (
							<View style={styles.tableRow} key={member.id}>
								<Text style={styles.tableCell}>{member.member}</Text>
								<Text style={styles.tableCellPhoneAndBirthdate}>
									{member.birthdate}
								</Text>
								<Text style={styles.tableCell}>{member.address}</Text>
								<Text style={styles.tableCellPhoneAndBirthdate}>
									{member.phone}
								</Text>
							</View>
						))}
					</View>
				</Page>
			))}
		</Document>
	)
}

export const DownloadPDF = ({ groups, listType }: DownloadPDFProps) => {
	const renderKey = useMemo(
		() => generatePrintKey(groups, listType),
		[groups, listType],
	)

	if (!groups.length) return null

	const fileName =
		listType === 'portrait' ? 'grupos-resumida.pdf' : 'grupos-detalhada.pdf'

	return (
		<PDFDownloadLink
			key={renderKey}
			className="inline-flex min-w-60 items-center justify-center gap-x-2 rounded-lg border border-transparent bg-teal-500 px-4 py-3 text-base font-semibold text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 disabled:pointer-events-none disabled:opacity-50"
			document={
				listType === 'portrait' ? (
					<PortraitList groups={groups} />
				) : (
					<LandscapeList groups={groups} />
				)
			}
			fileName={fileName}
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
