import { differenceInYears } from 'date-fns'

import { CHECK_IN_STATUS, PaymentSelectOptions, prisma } from '@/constants'

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
		participantsCities,
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
		await prisma.participantAddress.groupBy({
			where: {
				...(eventId && { participant: { eventId } }),
			},
			by: ['city'],
			_count: true,
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
		participantsCities,
	}
}

export const getDashboard = async (eventId: string | null) => {
	try {
		const {
			volunteerPaymentByType,
			participantPaymentByType,
			participantsAges,
			volunteersAges,
			participantsCities,
			...rest
		} = await queries(eventId)

		const ageRanges = {
			'14–19': 0,
			'20–29': 0,
			'30–39': 0,
			'40–49': 0,
			'50+': 0,
		}

		const labelsToFilter = PaymentSelectOptions.map((opt) => opt.value)
		const paymentsTypes = PaymentSelectOptions.map((opt) => opt.label)

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
			if (age <= 19) return ageRanges['14–19']++
			if (age <= 29) return ageRanges['20–29']++
			if (age <= 39) return ageRanges['30–39']++
			if (age <= 49) return ageRanges['40–49']++
			return ageRanges['50+']++
		})

		volunteersAges.forEach((v) => {
			const age = calculationAge(new Date(v.birthdate))
			if (age <= 19) return ageRanges['14–19']++
			if (age <= 29) return ageRanges['20–29']++
			if (age <= 39) return ageRanges['30–39']++
			if (age <= 49) return ageRanges['40–49']++
			return ageRanges['50+']++
		})

		const cities = participantsCities.map((c) => c.city)
		const citiesCounts = participantsCities.map((c) => c._count)

		const ages = Object.keys(ageRanges)
		const agesCounts = Object.values(ageRanges)

		return {
			...rest,
			ageRanges: {
				labels: ages,
				data: agesCounts,
			},
			paymentsTypes: {
				labels: paymentsTypes,
				data: paymentsTypesCounts,
			},
			participantsCities: {
				labels: cities,
				data: citiesCounts,
			},
		}
	} catch (error) {
		console.error('@getDashboard error:', error)
		throw Error
	}
}
