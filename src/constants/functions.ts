import { isFuture } from 'date-fns'

import { IMAGES_CLOSED, IMAGES_FORMS } from './globals'
import { MEMBERS, ROLES } from './status'

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

export const interestedListPermitCreateRegistration = (event: any) => {
	if (!event) return false

	if (!event.isInterestedListOpen) return false

	return isFuture(new Date(event.initialDate))
}

export const image = (eventName?: string) => {
	if (!eventName) return ''

	if (eventName.toLowerCase().includes('happening')) {
		return IMAGES_FORMS.happening
	}

	if (eventName.toLowerCase().includes('cursilho masculino')) {
		return IMAGES_FORMS['cursilho-masculino']
	}

	if (eventName.toLowerCase().includes('cursilho feminino')) {
		return IMAGES_FORMS['cursilho-feminino']
	}

	return ''
}

export const closedImage = (eventName?: string) => {
	if (!eventName) return ''

	if (eventName.toLowerCase().includes('happening')) {
		return IMAGES_CLOSED.happening
	}

	if (eventName.toLowerCase().includes('cursilho masculino')) {
		return IMAGES_CLOSED['cursilho-masculino']
	}

	return ''
}

export const validatePagePermission = (userRole: ROLES, pageRole: ROLES[]) => {
	return pageRole.includes(userRole)
}

export const generatePrintKey = <T>(
	data: Array<{ id: string; members: Array<T> }>,
	listType?: string,
) => {
	if (listType) {
		return data.map((d) => `${d.id}:${d.members.length}-${listType}`).join('|')
	}

	return data.map((d) => `${d.id}:${d.members.length}`).join('|')
}

export const generateColumnWidths = (data: any[] | any[][]) => {
	let aoa: any[][]
	if (!data.length) return [{ wch: 20 }]

	if (Array.isArray(data[0])) {
		aoa = data as any[][]
	} else {
		const headers = Object.keys(data[0])
		aoa = [
			headers,
			...(data as Record<string, any>[]).map((row) =>
				headers.map((h) => row[h]),
			),
		]
	}

	const colWidths = aoa[0].map((_, colIndex) => {
		const maxLength = aoa
			.map((row) => row?.[colIndex]?.toString().length || 0)
			.reduce((a, b) => Math.max(a, b), 0)

		return { wch: maxLength + 1 }
	})

	return colWidths
}
