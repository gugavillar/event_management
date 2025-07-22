import { donationSchemaRoute } from '@/app/api/donations/donation.schema'
import { prisma } from '@/constants'
import { FormDonation } from '@/services/queries/donations/donations.types'

export const createDonation = (data: FormDonation) => {
	try {
		donationSchemaRoute.parse({ ...data })

		return prisma.donation.create({
			data: { ...data },
		})
	} catch (error) {
		console.error('@createDonation error:', error)
		throw Error
	}
}
