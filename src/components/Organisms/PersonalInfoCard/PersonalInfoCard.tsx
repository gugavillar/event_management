import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { InformationCard } from '@/components/Atoms'
import { InfoBox } from '@/components/Molecules'

type PersonalInfoCardProps = ComponentProps<'div'> & {
	userInfo: {
		name: string
		email: string
		called: string
		birthdate: string
		contact: string
		maritalStatus: string
	}
}

export const PersonalInfoCard = ({
	className,
	userInfo,
	...props
}: PersonalInfoCardProps) => {
	return (
		<InformationCard
			headingText="Dados pessoais"
			className={twMerge('space-y-3 pb-6', className)}
			{...props}
		>
			<InfoBox label="Nome" value={userInfo.name} />
			<InfoBox label="Email" value={userInfo.email} />
			<InfoBox label="Como quer ser chamado" value={userInfo.called} />
			<InfoBox label="Data de nascimento" value={userInfo.birthdate} />
			<InfoBox label="Telefone" value={userInfo.contact} />
			<InfoBox label="Estado civil" value={userInfo.maritalStatus} />
		</InformationCard>
	)
}
