'use client'

import { Document, Page, PDFDownloadLink, StyleSheet, Text, View } from '@react-pdf/renderer'
import { FileDown } from 'lucide-react'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { Spinner } from '@/components/Atoms'
import { generatePrintKey } from '@/constants'

import type { formatTableData } from './Groups.utils'

export type GroupsPrintProps = {
	groups: ReturnType<typeof formatTableData>
	listType: 'portrait' | 'landscape' | ''
	handleClose: VoidFunction
}

type DocumentsProps = {
	groups: GroupsPrintProps['groups']
}

const baseCell = {
	borderWidth: 1,
	fontSize: 12,
	justifyContent: 'center',
	minHeight: 20,
	paddingHorizontal: 6,
	paddingVertical: 4,
} as const

const styles = StyleSheet.create({
	page: { padding: 20 },
	section: { marginBottom: 12 },
	tableCell: {
		...baseCell,
		width: '70%',
	},
	tableCellMemberType: {
		...baseCell,
		width: '30%',
	},
	tableCellPhoneAndBirthdate: {
		...baseCell,
		textAlign: 'center',
		width: '30%',
	},
	tableRow: { flexDirection: 'row' },
	title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
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
							<View key={member.id} style={styles.tableRow}>
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
				<Page key={group.id} orientation="landscape" size="A4" style={styles.page}>
					<View style={styles.section} wrap={false}>
						<Text style={styles.title}>
							{group.name} - Quantidade de membros: {group.members.length}
						</Text>
						{group.members.map((member) => (
							<View key={member.id} style={styles.tableRow}>
								<Text style={styles.tableCell}>{member.member}</Text>
								<Text style={styles.tableCellPhoneAndBirthdate}>{member.birthdate}</Text>
								<Text style={styles.tableCell}>{member.address}</Text>
								<Text style={styles.tableCellPhoneAndBirthdate}>{member.phone}</Text>
							</View>
						))}
					</View>
				</Page>
			))}
		</Document>
	)
}

export const GroupsPrint = ({ groups, listType, handleClose }: GroupsPrintProps) => {
	const renderKey = useMemo(() => generatePrintKey(groups, listType), [groups, listType])

	if (!groups.length) return null

	const fileName = listType === 'portrait' ? 'grupos-resumida.pdf' : 'grupos-detalhada.pdf'

	const handleClick = () => {
		toast.success('Arquivo baixado com sucesso!')
		setTimeout(handleClose, 1000)
	}

	return (
		<PDFDownloadLink
			className="inline-flex min-w-60 items-center justify-center gap-x-2 rounded-lg border border-transparent bg-teal-500 px-4 py-3 font-semibold text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 disabled:pointer-events-none disabled:opacity-50"
			document={listType === 'portrait' ? <PortraitList groups={groups} /> : <LandscapeList groups={groups} />}
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
						<FileDown /> Export grupos
					</span>
				)
			}
		</PDFDownloadLink>
	)
}
