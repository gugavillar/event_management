import { EventsFromAPI } from '../events/event.type'

export type ImportVolunteersDataValues = {
	file: File
	eventId: EventsFromAPI['id']
}
