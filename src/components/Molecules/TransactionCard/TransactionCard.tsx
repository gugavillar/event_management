import { Header, InformationCard } from '@/components/Atoms'
import { currencyValue } from '@/formatters'

type TransactionCardBase = {
	value: number
	headerText: string
	headerClassName?: string
}

type TransactionCardWithAccounts = TransactionCardBase & {
	isShowAccounts: true
	amountAccount: number
	amountCash: number
}

type TransactionCardWithoutAccounts = TransactionCardBase & {
	isShowAccounts?: false
	amountAccount?: never
	amountCash?: never
}

type TransactionCardProps =
	| TransactionCardWithAccounts
	| TransactionCardWithoutAccounts

export const TransactionCard = ({
	value,
	headerText,
	headerClassName,
	isShowAccounts,
	amountAccount,
	amountCash,
}: TransactionCardProps) => {
	return (
		<InformationCard headingText={headerText} headerClassName={headerClassName}>
			<div className="flex h-full items-center justify-end p-4 md:p-5">
				<Header as="h3" className="text-4xl">
					{currencyValue(value)}
				</Header>
			</div>
			{isShowAccounts && (
				<div className="flex flex-col items-end px-4 pb-4">
					<p className="font-semibold">
						Conta:{' '}
						<span className="font-normal">{currencyValue(amountAccount)}</span>
					</p>
					<p className="font-semibold">
						Dinheiro:{' '}
						<span className="font-normal">{currencyValue(amountCash)}</span>
					</p>
				</div>
			)}
		</InformationCard>
	)
}
