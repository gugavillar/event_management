import { differenceInYears } from 'date-fns'

import {
	CHECK_IN_STATUS,
	PaymentSelectOptions,
	PaymentTypeAPI,
	prisma,
} from '@/constants'

const calculationAge = (birthdate: Date, finalEventDate: Date) => {
	return differenceInYears(finalEventDate, birthdate)
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
				OR: [{ checkIn: null }, { checkIn: { not: CHECK_IN_STATUS.WITHDREW } }],
			},
		}),
		await prisma.volunteer.count({
			where: {
				...(eventId && { eventId }),
				OR: [{ checkIn: null }, { checkIn: { not: CHECK_IN_STATUS.WITHDREW } }],
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
				OR: [
					{ volunteer: { checkIn: null } },
					{ volunteer: { checkIn: { not: CHECK_IN_STATUS.WITHDREW } } },
				],
			},
			by: ['paymentType'],
			_count: true,
		}),
		await prisma.participantPayment.groupBy({
			where: {
				...(eventId && { eventId }),
				OR: [
					{ participant: { checkIn: null } },
					{ participant: { checkIn: { not: CHECK_IN_STATUS.WITHDREW } } },
				],
			},
			by: ['paymentType'],
			_count: true,
		}),
		await prisma.participant.findMany({
			where: {
				...(eventId && { eventId }),
				OR: [{ checkIn: null }, { checkIn: { not: CHECK_IN_STATUS.WITHDREW } }],
			},
			select: {
				birthdate: true,
				event: {
					select: {
						finalDate: true,
					},
				},
			},
		}),
		await prisma.volunteer.findMany({
			where: {
				...(eventId && { eventId }),
				OR: [{ checkIn: null }, { checkIn: { not: CHECK_IN_STATUS.WITHDREW } }],
			},
			select: {
				birthdate: true,
				event: {
					select: {
						finalDate: true,
					},
				},
			},
		}),
		await prisma.participantAddress.groupBy({
			where: {
				...(eventId && { participant: { eventId } }),
				OR: [
					{ participant: { checkIn: null } },
					{ participant: { checkIn: { not: CHECK_IN_STATUS.WITHDREW } } },
				],
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

		const ageRangesVolunteers = {
			'14–19': 0,
			'20–29': 0,
			'30–39': 0,
			'40–49': 0,
			'50+': 0,
		}

		const ageRangesParticipants = {
			'14–19': 0,
			'20–29': 0,
			'30–39': 0,
			'40–49': 0,
			'50+': 0,
		}

		const labelsToFilter = PaymentSelectOptions.map((opt) => opt.value)
		const paymentsTypes = PaymentSelectOptions.map((opt) => opt.label)

		const paymentsVolunteersTypesCounts = labelsToFilter.map((label) => {
			const valueVolunteer =
				volunteerPaymentByType.find(
					({ paymentType }) =>
						paymentType === label ||
						(paymentType === null && label === PaymentTypeAPI.OPEN),
				)?._count || 0
			return valueVolunteer
		})

		const paymentsParticipantsTypesCounts = labelsToFilter.map((label) => {
			const valueParticipant =
				participantPaymentByType.find(
					({ paymentType }) =>
						paymentType === label ||
						(paymentType === null && label === PaymentTypeAPI.OPEN),
				)?._count || 0

			return valueParticipant
		})

		participantsAges.forEach((p) => {
			const age = calculationAge(
				new Date(p.birthdate),
				new Date(p.event.finalDate),
			)
			if (age <= 19) return ageRangesParticipants['14–19']++
			if (age <= 29) return ageRangesParticipants['20–29']++
			if (age <= 39) return ageRangesParticipants['30–39']++
			if (age <= 49) return ageRangesParticipants['40–49']++
			return ageRangesParticipants['50+']++
		})

		volunteersAges.forEach((v) => {
			const age = calculationAge(
				new Date(v.birthdate),
				new Date(v.event.finalDate),
			)
			if (age <= 19) return ageRangesVolunteers['14–19']++
			if (age <= 29) return ageRangesVolunteers['20–29']++
			if (age <= 39) return ageRangesVolunteers['30–39']++
			if (age <= 49) return ageRangesVolunteers['40–49']++
			return ageRangesVolunteers['50+']++
		})

		const cities = participantsCities.map((c) => c.city)
		const citiesCounts = participantsCities.map((c) => c._count)

		const ages = Object.keys(ageRangesParticipants)
		const agesCountsVolunteers = Object.values(ageRangesVolunteers)
		const agesCountsParticipants = Object.values(ageRangesParticipants)

		return {
			...rest,
			ageRanges: {
				labels: ages,
				data: [
					{
						name: 'Participantes',
						data: agesCountsParticipants,
					},
					{
						name: 'Voluntários',
						data: agesCountsVolunteers,
					},
				],
			},
			paymentsTypes: {
				labels: paymentsTypes,
				data: [
					{ name: 'Participantes', data: paymentsParticipantsTypesCounts },
					{ name: 'Voluntários', data: paymentsVolunteersTypesCounts },
				],
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
