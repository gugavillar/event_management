import { donationSchemaRoute } from '@/app/api/donations/donation.schema'
import {
	PaymentTypeAPI,
	prisma,
	TransactionAmountType,
	TransactionsType,
} from '@/constants'
import type { FormDonation } from '@/services/queries/donations/donations.types'

export const createDonation = async (data: FormDonation) => {
	try {
		donationSchemaRoute.parse({ ...data })

		return await prisma.$transaction(async (tx) => {
			const donations = await tx.donation.create({
				data: { ...data },
			})
			await tx.transactions.create({
				data: {
					amount: data.value,
					amountType:
						data.type === PaymentTypeAPI.CASH
							? TransactionAmountType.CASH
							: TransactionAmountType.ACCOUNT,
					date: new Date(),
					description: `Doação - ${data.name}`,
					donationId: donations.id,
					eventId: data.eventId,
					type: TransactionsType.INCOME,
				},
			})
		})
	} catch (error) {
		console.error('@createDonation error:', error)
		throw Error
	}
}
