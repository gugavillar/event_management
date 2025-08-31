import { donationSchemaRoute } from '@/app/api/donations/donation.schema'
import { PaymentTypeAPI, prisma } from '@/constants'
import { FormDonation } from '@/services/queries/donations/donations.types'

export const createDonation = async (data: FormDonation) => {
	try {
		donationSchemaRoute.parse({ ...data })

		return await prisma.$transaction(async (tx) => {
			const donations = await tx.donation.create({
				data: { ...data },
			})
			await tx.transactions.create({
				data: {
					eventId: data.eventId,
					amount: data.value,
					donationId: donations.id,
					date: new Date(),
					description: `Doação - ${data.name}`,
					amountType: data.type === PaymentTypeAPI.CASH ? 'CASH' : 'ACCOUNT',
					type: 'INCOME',
				},
			})
		})
	} catch (error) {
		console.error('@createDonation error:', error)
		throw Error
	}
}
