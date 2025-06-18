import { isFuture } from 'date-fns'

import { MEMBERS } from './status'

export const overlayClose = async (elementId: string) => {
	const overlay = await import('preline/preline')
	overlay.HSOverlay.close(document.getElementById(elementId) as HTMLElement)
}

export const overlayOpen = async (elementId: string) => {
	const overlay = await import('preline/preline')
	overlay.HSOverlay.autoInit()
	overlay.HSOverlay.open(document.getElementById(elementId) as HTMLElement)
}

export const generatePage = (page: string | undefined) => {
	if (!page) return 1

	return Number(page)
}

export const eventPermitCreateRegistration = (event: any, type: MEMBERS) => {
	if (!event) return false

	const isFutureDate = isFuture(new Date(event.initialDate))

	if (!isFutureDate) return false

	if (type === MEMBERS.PARTICIPANT) {
		return event.isParticipantRegistrationOpen
	}

	if (type === MEMBERS.VOLUNTEER) {
		return event.isVolunteerRegistrationOpen
	}
}
