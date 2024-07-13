import { FormProvider, useForm } from 'react-hook-form'

import {
	Button,
	Drawer,
	DrawerBody,
	DrawerFooter,
	SelectProps,
} from '@/components/Atoms'
import {
	InputField,
	SelectField,
	InputFieldArray,
} from '@/components/Molecules'

type GroupDrawerProps = {
	drawerId: string
	leaders: SelectProps['options']
}

export const GroupDrawer = ({ drawerId, leaders }: GroupDrawerProps) => {
	const methods = useForm({
		defaultValues: {
			groupName: '',
			groupLeader: '',
			participants: [{ selectedParticipant: '' }],
		},
	})

	return (
		<Drawer drawerId={drawerId} headingTitle="Novo grupo">
			<DrawerBody>
				<FormProvider {...methods}>
					<InputField fieldName="groupName">Nome do grupo</InputField>
					<SelectField
						fieldName="groupLeader"
						options={leaders}
						placeholder="Selecione o líder do grupo"
					>
						Líder do grupo
					</SelectField>
					<InputFieldArray
						control={methods.control}
						name="participants"
						valueKey="selectedParticipant"
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
	)
}
