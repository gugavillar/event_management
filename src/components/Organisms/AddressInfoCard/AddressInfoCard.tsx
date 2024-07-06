import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { InformationCard } from '@/components/Atoms'
import { InfoBox } from '@/components/Molecules'

type AddressInfoCardProps = ComponentProps<'div'> & {
	addressInfo: {
		street: string
		city: string
		number: string
	}
}

export const AddressInfoCard = ({
	className,
	addressInfo,
	...props
}: AddressInfoCardProps) => {
	return (
		<InformationCard
			headingText="Endereço"
			className={twMerge('space-y-3 pb-6', className)}
			{...props}
		>
			<InfoBox label="Endereço" value={addressInfo.street} />
			<InfoBox label="Cidade" value={addressInfo.city} />
			<InfoBox label="Número" value={addressInfo.number} />
		</InformationCard>
	)
}
