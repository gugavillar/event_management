import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { InformationCard } from '@/components/Atoms'
import { InfoBox } from '@/components/Molecules'

type FamilyContactInfoProps = ComponentProps<'div'> & {
	responsibleInfo: Array<{
		name: string
		phone: string
	}>
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
			{responsibleInfo.map(({ name, phone }, index) => (
				<InfoBox key={index} label={name} value={phone} />
			))}
		</InformationCard>
	)
}
