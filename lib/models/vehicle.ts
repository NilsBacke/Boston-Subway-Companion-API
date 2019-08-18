export interface Vehicle {
	id: string
	bearing: number
	latitude: number
	longitude: number
	speed: number | null
	updatedAt: string
	lineName: string
	directionDestination: string
	nextStop: string
}

export function makeVehicle(jsonResponse: any, index: number): Vehicle {
	const attributes = jsonResponse.data[index].attributes
	const directionId = jsonResponse.data[index].attributes.direction_id
	const routeId = jsonResponse.data[index].relationships.route.data.id
	let stopId = ''
	const stopData = jsonResponse.data[index].relationships.stop.data
	if (stopData) {
		stopId = stopData.id
	} else {
		stopId = ''
	}

	const directionDestination = jsonResponse.included.find((val: any) => val.id === routeId)!.attributes
		.direction_destinations[directionId]

	const stopName =
		stopId.length > 0 ? jsonResponse.included.find((val: any) => val.id === stopId)!.attributes.name : ''

	return {
		id: jsonResponse.data[index].id,
		bearing: attributes.bearing,
		latitude: attributes.latitude,
		longitude: attributes.longitude,
		speed: attributes.speed,
		updatedAt: attributes.updated_at,
		lineName: routeId + ' Line',
		directionDestination: directionDestination,
		nextStop: stopName
	}
}
