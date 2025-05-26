import { isToday } from 'date-fns'

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

export const eventPermitCreateRegistration = (event: any) => {
	if (!event) return false

	const isStartDateToday = isToday(new Date(event.initialDate))

	if (isStartDateToday) return false

	return true
}
