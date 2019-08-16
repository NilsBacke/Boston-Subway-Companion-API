export interface Vehicle {
	id: string
	bearing: number
	latitude: number
	longitude: number
	speed: number | null
	updatedAt: string
	lineName: string
	directionDestination: string
}

export function makeVehicle(jsonResponse: any, index: number): Vehicle {
	const attributes = jsonResponse.data[index].attributes
	const directionId = jsonResponse.data[index].attributes.direction_id

	return {
		id: jsonResponse.data[index].id,
		bearing: attributes.bearing,
		latitude: attributes.latitude,
		longitude: attributes.longitude,
		speed: attributes.speed,
		updatedAt: attributes.updatedAt,
		lineName: jsonResponse.data[index].relationships.route.data.id + ' line',
		directionDestination: jsonResponse.included[index].attributes.direction_destinations[directionId]
	}
}
