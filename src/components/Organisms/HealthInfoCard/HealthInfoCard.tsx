import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { InformationCard } from '@/components/Atoms'
import { InfoBox } from '@/components/Molecules'

type HealthInfoCardProps = ComponentProps<'div'> & {
	healthInfo: string
}

export const HealthInfoCard = ({
	healthInfo,
	className,
	...props
}: HealthInfoCardProps) => {
	return (
		<InformationCard
			headingText="Informações de saúde"
			className={twMerge('space-y-3 pb-6', className)}
			{...props}
		>
			<InfoBox label="Saúde/Médica/Alimentar" value={healthInfo} />
		</InformationCard>
	)
}
