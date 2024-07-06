import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { InformationCard } from '@/components/Atoms'
import { InfoBox } from '@/components/Molecules'

type PersonalInfoCardProps = ComponentProps<'div'> & {
	userInfo: {
		name: string
		firstName: string
		birthdate: string
		phone: string
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
			<InfoBox label="Como quer ser chamado" value={userInfo.firstName} />
			<InfoBox label="Data de nascimento" value={userInfo.birthdate} />
			<InfoBox label="Telefone" value={userInfo.phone} />
		</InformationCard>
	)
}
