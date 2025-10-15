import { differenceInYears, getMonth } from 'date-fns'

import { CHECK_IN_STATUS, PaymentSelectOptions, PaymentType, type PaymentTypeAPI, prisma } from '@/constants'

const calculationAge = (birthdate: Date, finalEventDate: Date) => {
	return differenceInYears(finalEventDate, birthdate)
}

const queries = async (eventId: string | null) => {
	const [participants, volunteers, participantsCities, interestedParticipants] = await Promise.all([
		await prisma.participant.findMany({
			include: {
				event: true,
				payments: true,
			},
			where: {
				...(eventId && { eventId }),
				AND: {
					OR: [{ interested: false }, { interested: null }],
				},
				OR: [{ checkIn: null }, { checkIn: { not: CHECK_IN_STATUS.WITHDREW } }],
			},
		}),
		await prisma.volunteer.findMany({
			include: {
				event: true,
				payments: true,
			},
			where: {
				...(eventId && { eventId }),
				OR: [{ checkIn: null }, { checkIn: { not: CHECK_IN_STATUS.WITHDREW } }],
			},
		}),
		await prisma.participantAddress.groupBy({
			_count: true,
			by: ['city'],
			where: {
				...(eventId && { participant: { eventId } }),
				AND: {
					OR: [{ participant: { interested: false } }, { participant: { interested: null } }],
				},
				OR: [{ participant: { checkIn: null } }, { participant: { checkIn: { not: CHECK_IN_STATUS.WITHDREW } } }],
			},
		}),
		await prisma.participant.count({
			where: {
				...(eventId && { eventId }),
				interested: true,
			},
		}),
	])

	return {
		interestedParticipants,
		participants,
		participantsCities,
		volunteers,
	}
}

export const getDashboard = async (eventId: string | null) => {
	try {
		const { participantsCities, participants, volunteers, interestedParticipants } = await queries(eventId)

		const totalOfParticipants = participants.length
		const totalOfVolunteers = volunteers.length
		const totalOfConfirmedParticipants = participants.filter(
			(participant) => participant.checkIn === CHECK_IN_STATUS.CONFIRMED
		).length
		const totalOfConfirmedVolunteers = volunteers.filter(
			(volunteer) => volunteer.checkIn === CHECK_IN_STATUS.CONFIRMED
		).length
		const totalOfParticipantsPayments = participants.reduce((acc, participant) => {
			const hasPayment = participant.payments.length > 0
			if (hasPayment) {
				const participantPaymentValue = participant.payments.reduce(
					(value, p) => (value += p.paymentValue.toNumber()),
					0
				)
				if (participantPaymentValue >= participant.event.participantPrice.toNumber()) {
					return acc + 1
				}
			}
			return acc
		}, 0)
		const totalOfVolunteersPayments = volunteers.reduce((acc, volunteer) => {
			const hasPayment = volunteer.payments.length > 0
			if (hasPayment) {
				const volunteerPaymentValue = volunteer.payments.reduce((value, v) => (value += v.paymentValue.toNumber()), 0)
				if (volunteerPaymentValue >= volunteer.event.volunteerPrice.toNumber()) {
					return acc + 1
				}
			}
			return acc
		}, 0)

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
			const age = calculationAge(new Date(p.birthdate), new Date(p.event.finalDate))
			if (age <= 19) return ageRangesParticipants['14–19']++
			if (age <= 29) return ageRangesParticipants['20–29']++
			if (age <= 39) return ageRangesParticipants['30–39']++
			if (age <= 49) return ageRangesParticipants['40–49']++
			return ageRangesParticipants['50+']++
		})

		volunteers.forEach((v) => {
			const age = calculationAge(new Date(v.birthdate), new Date(v.event.finalDate))
			if (age <= 19) return ageRangesVolunteers['14–19']++
			if (age <= 29) return ageRangesVolunteers['20–29']++
			if (age <= 39) return ageRangesVolunteers['30–39']++
			if (age <= 49) return ageRangesVolunteers['40–49']++
			return ageRangesVolunteers['50+']++
		})

		const labelAgesArray = Object.keys(ageRangesParticipants)
		const agesCountsVolunteersArray = Object.values(ageRangesVolunteers)
		const agesCountsParticipantsArray = Object.values(ageRangesParticipants)

		const volunteersPaymentsByType = volunteers.reduce(
			(acc, volunteer) => {
				if (!volunteer.payments.length) {
					acc['Em aberto'] = (acc['Em aberto'] || 0) + 1
					return acc
				}
				const volunteerPaidValue = volunteer.payments.reduce((value, v) => (value += v.paymentValue.toNumber()), 0)
				const isPaidEnough = volunteerPaidValue >= volunteer.event.volunteerPrice.toNumber()
				const type = volunteer.payments[volunteer.payments.length - 1].paymentType
				if (!isPaidEnough) {
					acc['Em aberto'] = (acc['Em aberto'] || 0) + 1
				} else {
					const label = PaymentType[type as PaymentTypeAPI].label
					acc[label] = (acc[label] || 0) + 1
				}

				return acc
			},
			{} as Record<string, number>
		)

		const participantsPaymentsByType = participants.reduce(
			(acc, participant) => {
				if (!participant.payments.length) {
					acc['Em aberto'] = (acc['Em aberto'] || 0) + 1
					return acc
				}
				const participantPaidValue = participant.payments.reduce((acc, p) => (acc += p.paymentValue.toNumber()), 0)
				const isPaidEnough = participantPaidValue >= participant.event.participantPrice.toNumber()
				const type = participant.payments[participant.payments.length - 1].paymentType
				if (!isPaidEnough) {
					acc['Em aberto'] = (acc['Em aberto'] || 0) + 1
				} else {
					const label = PaymentType[type as PaymentTypeAPI].label
					acc[label] = (acc[label] || 0) + 1
				}

				return acc
			},
			{} as Record<string, number>
		)

		const paymentTypesLabelsArray = PaymentSelectOptions.map((paymentOption) => paymentOption.label)

		const participantsPaymentsByTypeArray = PaymentSelectOptions.map(
			(paymentOption) => participantsPaymentsByType[paymentOption.label] || 0
		)
		const volunteersPaymentsByTypeArray = PaymentSelectOptions.map(
			(paymentOption) => volunteersPaymentsByType[paymentOption.label] || 0
		)

		const birthdayParticipant = participants.filter((p) => {
			const birthdateMonth = getMonth(p.birthdate)
			const initialEventMonth = getMonth(p.event.initialDate)
			const finalEventMonth = getMonth(p.event.finalDate)
			return birthdateMonth === initialEventMonth || birthdateMonth === finalEventMonth
		})

		const birthdayVolunteer = volunteers.filter((v) => {
			const birthdateMonth = getMonth(v.birthdate)
			const initialEventMonth = getMonth(v.event.initialDate)
			const finalEventMonth = getMonth(v.event.finalDate)
			return birthdateMonth === initialEventMonth || birthdateMonth === finalEventMonth
		})

		const birthdatePeople = [...birthdayParticipant, ...birthdayVolunteer].sort((peopleA, peopleB) =>
			peopleA.name.localeCompare(peopleB.name)
		)

		return {
			ageRanges: {
				data: [
					{
						data: agesCountsParticipantsArray,
						name: 'Participantes',
					},
					{
						data: agesCountsVolunteersArray,
						name: 'Voluntários',
					},
				],
				labels: labelAgesArray,
			},
			birthdayPeople: birthdatePeople,
			confirmedParticipants: totalOfConfirmedParticipants,
			confirmedVolunteers: totalOfConfirmedVolunteers,
			interestedParticipants,
			participantPayment: totalOfParticipantsPayments,
			participants: totalOfParticipants,
			participantsCities: {
				data: citiesCountArray,
				labels: labelCitiesArray,
			},
			paymentsTypes: {
				data: [
					{ data: participantsPaymentsByTypeArray, name: 'Participantes' },
					{ data: volunteersPaymentsByTypeArray, name: 'Voluntários' },
				],
				labels: paymentTypesLabelsArray,
			},
			volunteerPayment: totalOfVolunteersPayments,
			volunteers: totalOfVolunteers,
		}
	} catch (error) {
		console.error('@getDashboard error:', error)
		throw Error
	}
}
