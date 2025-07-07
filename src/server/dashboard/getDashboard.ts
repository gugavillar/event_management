import { differenceInYears } from 'date-fns'

import {
	CHECK_IN_STATUS,
	PaymentSelectOptions,
	PaymentType,
	prisma,
} from '@/constants'

const calculationAge = (birthdate: Date, finalEventDate: Date) => {
	return differenceInYears(finalEventDate, birthdate)
}

const queries = async (eventId: string | null) => {
	const [
		participants,
		volunteers,
		participantsPayment,
		volunteersPayment,
		participantsCities,
	] = await Promise.all([
		await prisma.participant.findMany({
			where: {
				...(eventId && { eventId }),
				OR: [{ checkIn: null }, { checkIn: { not: CHECK_IN_STATUS.WITHDREW } }],
			},
			include: {
				event: true,
			},
		}),
		await prisma.volunteer.findMany({
			where: {
				...(eventId && { eventId }),
				OR: [{ checkIn: null }, { checkIn: { not: CHECK_IN_STATUS.WITHDREW } }],
			},
			include: {
				event: true,
			},
		}),
		await prisma.participantPayment.findMany({
			where: {
				...(eventId && { eventId }),
			},
			include: {
				participant: true,
				event: true,
			},
		}),
		await prisma.volunteerPayment.findMany({
			where: {
				...(eventId && { eventId }),
			},
			include: {
				event: true,
				volunteer: true,
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
		participantsPayment,
		volunteersPayment,
		participantsCities,
	}
}

export const getDashboard = async (eventId: string | null) => {
	try {
		const {
			participantsCities,
			participants,
			volunteers,
			participantsPayment,
			volunteersPayment,
		} = await queries(eventId)

		const totalOfParticipants = participants.length
		const totalOfVolunteers = volunteers.length
		const totalOfConfirmedParticipants = participants.filter(
			(participant) => participant.checkIn === CHECK_IN_STATUS.CONFIRMED,
		).length
		const totalOfConfirmedVolunteers = volunteers.filter(
			(volunteer) => volunteer.checkIn === CHECK_IN_STATUS.CONFIRMED,
		).length
		const totalOfParticipantsPayments = participantsPayment.filter(
			(participant) =>
				participant.paymentValue.toNumber() >=
				participant.event.participantPrice.toNumber(),
		).length
		const totalOfVolunteersPayments = volunteersPayment.filter(
			(volunteer) =>
				volunteer.paymentValue.toNumber() >=
				volunteer.event.volunteerPrice.toNumber(),
		).length

		const labelCitiesArray = participantsCities.map((city) => city.city)
		const citiesCountArray = participantsCities.map((city) => city._count)

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

		participants.forEach((p) => {
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

		volunteers.forEach((v) => {
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

		const labelAgesArray = Object.keys(ageRangesParticipants)
		const agesCountsVolunteersArray = Object.values(ageRangesVolunteers)
		const agesCountsParticipantsArray = Object.values(ageRangesParticipants)

		const volunteersPaymentsByType = volunteersPayment.reduce(
			(acc, volunteerPayment) => {
				const { checkIn } = volunteerPayment.volunteer
				const hasValidCheckIn = !checkIn || checkIn !== CHECK_IN_STATUS.WITHDREW

				if (!hasValidCheckIn) return acc

				const paidEnough =
					volunteerPayment.paymentValue.toNumber() >=
					volunteerPayment.event.volunteerPrice.toNumber()

				const type = volunteerPayment.paymentType
				const label = type && paidEnough ? PaymentType[type].label : 'Em aberto'

				acc[label] = (acc[label] || 0) + 1

				return acc
			},
			{} as Record<string, number>,
		)

		const participantsPaymentsByType = participantsPayment.reduce(
			(acc, participantPayment) => {
				const { checkIn } = participantPayment.participant
				const hasValidCheckIn = !checkIn || checkIn !== CHECK_IN_STATUS.WITHDREW

				if (!hasValidCheckIn) return acc

				const paidEnough =
					participantPayment.paymentValue.toNumber() >=
					participantPayment.event.participantPrice.toNumber()

				const type = participantPayment.paymentType
				const label = type && paidEnough ? PaymentType[type].label : 'Em aberto'

				acc[label] = (acc[label] || 0) + 1

				return acc
			},
			{} as Record<string, number>,
		)

		const paymentTypesLabelsArray = PaymentSelectOptions.map(
			(paymentOption) => paymentOption.label,
		)

		const participantsPaymentsByTypeArray = PaymentSelectOptions.map(
			(paymentOption) => participantsPaymentsByType[paymentOption.label] || 0,
		)
		const volunteersPaymentsByTypeArray = PaymentSelectOptions.map(
			(paymentOption) => volunteersPaymentsByType[paymentOption.label] || 0,
		)

		return {
			confirmedVolunteers: totalOfConfirmedVolunteers,
			confirmedParticipants: totalOfConfirmedParticipants,
			participants: totalOfParticipants,
			volunteers: totalOfVolunteers,
			participantPayment: totalOfParticipantsPayments,
			volunteerPayment: totalOfVolunteersPayments,
			ageRanges: {
				labels: labelAgesArray,
				data: [
					{
						name: 'Participantes',
						data: agesCountsParticipantsArray,
					},
					{
						name: 'Voluntários',
						data: agesCountsVolunteersArray,
					},
				],
			},
			paymentsTypes: {
				labels: paymentTypesLabelsArray,
				data: [
					{ name: 'Participantes', data: participantsPaymentsByTypeArray },
					{ name: 'Voluntários', data: volunteersPaymentsByTypeArray },
				],
			},
			participantsCities: {
				labels: labelCitiesArray,
				data: citiesCountArray,
			},
		}
	} catch (error) {
		console.error('@getDashboard error:', error)
		throw Error
	}
}
