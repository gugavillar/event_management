import { differenceInYears } from 'date-fns'

import {
	ageRanges,
	CHECK_IN_STATUS,
	PaymentSelectOptions,
	prisma,
} from '@/constants'

const calculationAge = (birthdate: Date) => {
	return differenceInYears(new Date(), birthdate)
}

const queries = async (eventId: string | null) => {
	const [
		participants,
		volunteers,
		confirmedParticipants,
		confirmedVolunteers,
		participantPayment,
		volunteerPayment,
		volunteerPaymentByType,
		participantPaymentByType,
		participantsAges,
		volunteersAges,
	] = await Promise.all([
		await prisma.participant.count({
			where: {
				...(eventId && { eventId }),
			},
		}),
		await prisma.volunteer.count({
			where: {
				...(eventId && { eventId }),
			},
		}),
		await prisma.participant.count({
			where: {
				...(eventId && { eventId }),
				checkIn: CHECK_IN_STATUS.CONFIRMED,
			},
		}),
		await prisma.volunteer.count({
			where: {
				...(eventId && { eventId }),
				checkIn: CHECK_IN_STATUS.CONFIRMED,
			},
		}),
		await prisma.participantPayment.count({
			where: {
				...(eventId && { eventId }),
				paymentType: {
					not: null,
				},
			},
		}),
		await prisma.volunteerPayment.count({
			where: {
				...(eventId && { eventId }),
				paymentType: {
					not: null,
				},
			},
		}),
		await prisma.volunteerPayment.groupBy({
			where: {
				...(eventId && { eventId }),
			},
			by: ['paymentType'],
			_count: true,
		}),
		await prisma.participantPayment.groupBy({
			where: {
				...(eventId && { eventId }),
			},
			by: ['paymentType'],
			_count: true,
		}),
		await prisma.participant.findMany({
			where: {
				...(eventId && { eventId }),
			},
			select: {
				birthdate: true,
			},
		}),
		await prisma.volunteer.findMany({
			where: {
				...(eventId && { eventId }),
			},
			select: {
				birthdate: true,
			},
		}),
	])

	return {
		participants,
		volunteers,
		confirmedParticipants,
		confirmedVolunteers,
		participantPayment,
		volunteerPayment,
		volunteerPaymentByType,
		participantPaymentByType,
		participantsAges,
		volunteersAges,
	}
}

export const getDashboard = async (eventId: string | null) => {
	try {
		const {
			volunteerPaymentByType,
			participantPaymentByType,
			participantsAges,
			volunteersAges,
			...rest
		} = await queries(eventId)

		const labelsToFilter = PaymentSelectOptions.map((opt) => opt.value)
		const labels = PaymentSelectOptions.map((opt) => opt.label)

		const paymentsTypesCounts = labelsToFilter.map((label) => {
			const valueVolunteer =
				volunteerPaymentByType.find(({ paymentType }) => paymentType === label)
					?._count || 0

			const valueParticipant =
				participantPaymentByType.find(
					({ paymentType }) => paymentType === label,
				)?._count || 0

			return valueVolunteer + valueParticipant
		})

		participantsAges.forEach((p) => {
			const age = calculationAge(new Date(p.birthdate))
			if (age <= 19) ageRanges['14–19']++
			else if (age <= 29) ageRanges['20–29']++
			else if (age <= 39) ageRanges['30–39']++
			else if (age <= 49) ageRanges['40–49']++
			else ageRanges['50+']++
		})

		volunteersAges.forEach((v) => {
			const age = calculationAge(new Date(v.birthdate))
			if (age <= 19) ageRanges['14–19']++
			else if (age <= 29) ageRanges['20–29']++
			else if (age <= 39) ageRanges['30–39']++
			else if (age <= 49) ageRanges['40–49']++
			else ageRanges['50+']++
		})

		return {
			...rest,
			paymentsTypes: {
				labels,
				data: paymentsTypesCounts,
			},
			ageRanges,
		}
	} catch (error) {
		console.error('@getDashboard error:', error)
		throw Error
	}
}
