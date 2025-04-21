import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { InformationCard } from '@/components/Atoms'
import { InfoBox } from '@/components/Molecules'

type FamilyContactInfoProps = ComponentProps<'div'> & {
	responsibleInfo: {
		parent: string
		contactParent: string
		relationship: string
		host: string
		contactHost: string
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
			<InfoBox label="Parente próximo" value={responsibleInfo.parent} />
			<InfoBox
				label="Telefone do parente"
				value={responsibleInfo.contactParent}
			/>
			<InfoBox label="Parentesco" value={responsibleInfo.relationship} />
			<InfoBox label="Quem convidou" value={responsibleInfo.host} />
			<InfoBox
				label="Contato de quem convidou"
				value={responsibleInfo.contactHost}
			/>
		</InformationCard>
	)
}
