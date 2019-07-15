import { northList, eastList, southList, westList } from '../constants'

export interface Stop {
	id: string
	name: string
	latitude: number
	longitude: number
	directionDestination: string
	directionName: string
	lineName: string
}

export function makeStop(data: any): Stop {
	const desc = data[0]['attributes']
	const lineName = desc.substring(desc.indexOf('- ') + 2, desc.lastIndexOf(' -'))
	return {
		id: data.id,
		name: data['attributes'].name,
		latitude: data['attributes'].latitude,
		longitude: data['attributes'].longitude,
		directionDestination: data['attributes'].platform_name,
		directionName: convertDirectionToName(data['attributes'].platform_name),
		lineName: lineName
	}
}

function convertDirectionToName(direction: string): string {
	if (direction == 'Park Street & North') {
		return 'East'
	}

	if (
		northList.includes(direction) ||
		direction.toLowerCase().includes('north') ||
		direction.toLowerCase().includes(northList.reduce((t1, t2) => t1.toString() + t2.toString()))
	) {
		return 'North'
	} else if (
		southList.includes(direction) ||
		direction.toLowerCase().includes('south') ||
		direction.toLowerCase().includes(southList.reduce((t1, t2) => t1.toString() + t2.toString()))
	) {
		return 'South'
	} else if (
		eastList.includes(direction) ||
		direction.toLowerCase().includes('east') ||
		direction.toLowerCase().includes(eastList.reduce((t1, t2) => t1.toString() + t2.toString()))
	) {
		return 'East'
	} else if (
		westList.includes(direction) ||
		direction.toLowerCase().includes('west') ||
		direction.toLowerCase().includes(westList.reduce((t1, t2) => t1.toString() + t2.toString()))
	) {
		return 'West'
	} else {
		// TODO: will need to do something with these weird stops
		return ''
	}
}
