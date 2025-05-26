import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { InformationCard } from '@/components/Atoms'
import { InfoBox } from '@/components/Molecules'

type FamilyContactInfoProps = ComponentProps<'div'> & {
	responsibleInfo: {
		responsible: string
		responsiblePhone: string
		host: string
		hostPhone: string
	}
}

export const FamilyContactInfo = ({
	className,
	responsibleInfo,
	...props
}: FamilyContactInfoProps) => {
	return (
		<InformationCard
			headingText="Rede de apoio"
			className={twMerge('space-y-3 pb-6', className)}
			{...props}
		>
			<InfoBox label="Responsável" value={responsibleInfo.responsible} />
			<InfoBox
				label="Telefone do responsável"
				value={responsibleInfo.responsiblePhone}
			/>
			<InfoBox label="Quem convidou" value={responsibleInfo.host} />
			<InfoBox
				label="Contato de quem convidou"
				value={responsibleInfo.hostPhone}
			/>
		</InformationCard>
	)
}
