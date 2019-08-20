export interface Alert {
	stopId: string
	id: string
	startDate: string
	endDate: string
	timeframe: string
	title: string // service effect
	subtitle: string // header
	description: string
	updatedAt: string
}

export function makeAlert(json: any, stopId: string): Alert {
	const attributes = json.attributes
	return {
		stopId: stopId,
		id: json.id,
		startDate: attributes.active_period[0].start,
		endDate: attributes.active_period[0].end,
		timeframe: attributes.timeframe,
		title: attributes.service_effect,
		subtitle: attributes.header,
		description: attributes.description,
		updatedAt: attributes.updated_at
	}
}
