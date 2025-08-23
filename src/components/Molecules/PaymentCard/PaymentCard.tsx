import { Header, InformationCard } from '@/components/Atoms'
import { currencyValue } from '@/formatters'

type PaymentCardProps = {
	value: number
	headerText: string
	headerClassName?: string
}

export const PaymentCard = ({
	value,
	headerText,
	headerClassName,
}: PaymentCardProps) => {
	return (
		<InformationCard headingText={headerText} headerClassName={headerClassName}>
			<div className="flex h-full items-center justify-end p-4 md:p-5">
				<Header as="h3" className="text-4xl">
					{currencyValue(value)}
				</Header>
			</div>
		</InformationCard>
	)
}
