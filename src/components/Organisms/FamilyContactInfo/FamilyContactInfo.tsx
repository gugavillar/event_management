import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { InformationCard } from '@/components/Atoms'
import { InfoBox } from '@/components/Molecules'

type BaseProps = ComponentProps<'div'>

type VolunteerProps = BaseProps & {
	type: 'volunteer'
	responsibleInfo: {
		relative: string
		relativePhone: string
	}
}

type ParticipantProps = BaseProps & {
	type: 'participant'
	responsibleInfo: {
		host: string
		hostPhone: string
		responsible: string
		responsiblePhone: string
	}
}

type FamilyContactInfoProps = VolunteerProps | ParticipantProps

export const FamilyContactInfo = ({
	className,
	responsibleInfo,
	type,
	...props
}: FamilyContactInfoProps) => {
	return (
		<InformationCard
			headingText="Rede de apoio"
			className={twMerge('space-y-3 pb-6', className)}
			{...props}
		>
			{type === 'participant' ? (
				<>
					<InfoBox
						label="Responsável/Parente próximo"
						value={responsibleInfo.responsible}
					/>
					<InfoBox
						label="Telefone do responsável/parente"
						value={responsibleInfo.responsiblePhone}
					/>
					<InfoBox label="Quem convidou" value={responsibleInfo.host} />
					<InfoBox
						label="Contato de quem convidou"
						value={responsibleInfo.hostPhone}
					/>
				</>
			) : (
				<>
					<InfoBox label="Parente próximo" value={responsibleInfo.relative} />
					<InfoBox
						label="Telefone do parente"
						value={responsibleInfo.relativePhone}
					/>
				</>
			)}
		</InformationCard>
	)
}
