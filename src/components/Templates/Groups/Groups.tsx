'use client'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { MdOutlineGroups } from 'react-icons/md'

import {
	Button,
	Drawer,
	DrawerBody,
	DrawerFooter,
	Header,
	Spinner,
} from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { InputField } from '@/components/Molecules/InputField/InputField'
import { InputFieldArray } from '@/components/Molecules/InputFieldArray/InputFieldArray'
import { ListPage, PageContent } from '@/components/Organisms'
import { MODALS_IDS } from '@/constants'

import { FAKE_PARTICIPANTES } from './Groups.mocks'

const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Grupo',
		accessor: 'group',
	},
]

export const Groups = () => {
	const [tableData, setTableData] = useState<null | Array<
		ReturnType<typeof FAKE_PARTICIPANTES>
	>>(null)

	const methods = useForm({
		defaultValues: {
			groupName: '',
			participants: [{ selectedValue: '' }],
		},
	})

	useEffect(() => {
		if (tableData) return

		const groups = []
		for (let i = 1; i <= 4; i++) {
			groups.push(FAKE_PARTICIPANTES(i))
		}

		setTableData(groups)
	}, [tableData])

	console.log(methods.watch())

	return (
		<PageContent subheadingPage="Listagem de grupos">
			{!tableData ? (
				<Spinner />
			) : (
				<ListPage
					placeholderField="Encontrar um participante"
					className="w-full lg:max-w-full"
					actionButton={
						<Button
							type="button"
							data-hs-overlay={`#${MODALS_IDS.GROUP_DRAWER}`}
							leftIcon={<MdOutlineGroups />}
							className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
						>
							Criar um novo grupo
						</Button>
					}
				>
					{tableData?.map((data, index) => (
						<div key={index} className="space-y-2">
							<Header>Grupo {index + 1}</Header>
							<ListManager headerLabels={HEADER_LABELS} bodyData={data} />
						</div>
					))}
				</ListPage>
			)}
			<Drawer drawerId={MODALS_IDS.GROUP_DRAWER} headingTitle="Novo grupo">
				<DrawerBody>
					<FormProvider {...methods}>
						<InputField fieldName="groupName">Nome do grupo</InputField>
						<InputFieldArray
							control={methods.control}
							name="participants"
							valueKey="selectedValue"
						>
							Selecione um participante
						</InputFieldArray>
					</FormProvider>
				</DrawerBody>
				<DrawerFooter>
					<Button className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800">
						Criar grupo
					</Button>
				</DrawerFooter>
			</Drawer>
		</PageContent>
	)
}
