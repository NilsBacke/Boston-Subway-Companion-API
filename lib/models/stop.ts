import { northList, eastList, southList, westList, stopToRouteMap } from '../constants'

type RouteType = 0 | 1 | 2 | 3

const MBTAred = '0xFFDA291C'
const MBTAorange = '0xFFED8B00'
const MBTAblue = '0xFF003DA5'
const MBTAgreen = '0xFF00843D'

export interface Stop {
	id: string
	name: string
	latitude: number
	longitude: number
	directionDestination: string
	directionName: string
	lineName: string
	textColorHex: string
	lineColorHex: string
	lineInitials: string
	directionDescription: string
	routeType: RouteType
}

export function makeStop(data: any): Stop[] {
	const vehicleType = !!data['attributes'].vehicle_type ? data['attributes'].vehicle_type : 1
	if (vehicleType === 0 || vehicleType === 1) {
		return makeSubwayStop(data)
	}

	return makeBusStop(data)
}

function makeSubwayStop(data: any): Stop[] {
	const desc = data['attributes']['description']
	const lineName = getLineName(desc, data)
	const directionDestination = data['attributes'].platform_name
	const directionName = convertDirectionToName(data['attributes'].platform_name, data['attributes'].name)
	const routeType: RouteType = !!data['attributes'].vehicle_type ? data['attributes'].vehicle_type : 1
	return [
		{
			id: data.id,
			name: data['attributes'].name,
			latitude: data['attributes'].latitude,
			longitude: data['attributes'].longitude,
			directionDestination: directionDestination, // Oak Grove, Forest Hills
			directionName: directionName,
			lineName: lineName,
			textColorHex: getTextColor(lineName),
			lineColorHex: getLineColor(lineName, routeType),
			lineInitials: getLineInitials(lineName),
			directionDescription: getDirectionDescription(directionDestination, directionName),
			routeType: routeType
		}
	]
}

function makeBusStop(data: any): Stop[] {
	const routes = !!stopToRouteMap[data.id] ? stopToRouteMap[data.id] : []
	const platformName = data['attributes'].platform_name || ''
	const stops: Stop[] = []
	const routeType: RouteType = !!data['attributes'].vehicle_type ? data['attributes'].vehicle_type : 3

	for (const route of routes) {
		const lineName = route.name
		// const routeId = route.id
		stops.push({
			id: data.id,
			name: data['attributes'].name,
			latitude: data['attributes'].latitude,
			longitude: data['attributes'].longitude,
			directionDestination: platformName,
			directionName: '',
			lineName: lineName,
			textColorHex: getTextColor(lineName),
			lineColorHex: getLineColor(lineName, routeType),
			lineInitials: lineName,
			directionDescription: !!platformName ? 'Towards ' + platformName : '',
			routeType: routeType
		})
	}

	return stops
}

function getLineName(desc: string, data: any): string {
	if (desc.indexOf('-') === desc.lastIndexOf('-')) {
		// end of line stop
		return data['attributes']['platform_name']
	}
	return desc.substring(desc.indexOf('- ') + 2, desc.lastIndexOf(' -'))
}

function getDirectionDescription(directionDestination: string, directionName: string): string {
	return directionName + 'bound towards ' + directionDestination
}

function getLineInitials(lineName: string): string {
	return lineName === 'Mattapan' ? 'M' : lineName[0].toUpperCase() + 'L'
}

function getLineColor(lineName: string, routeType: RouteType): string {
	if (!lineName) {
		return '0xFFA9A9A9'
	}

	if (routeType === 3) {
		if (lineName.includes('SL')) {
			return '0xFFC0C0C0'
		}
		if (lineName.includes('CT')) {
			return '0xFF#FFCA39'
		}
		if (!isNaN(+lineName)) {
			return '0xFFFFC72D'
		}
	}

	switch (lineName) {
		case 'Orange Line':
			return MBTAorange
		case 'Green Line':
			return MBTAgreen
		case 'Blue Line':
			return MBTAblue
		case 'Red Line':
		case 'Mattapan':
		case 'Mattapan Trolley':
			return MBTAred
		default:
			return ''
	}
}

export function getTextColor(lineName: string): string {
	if (!lineName) {
		return '0xFFA9A9A9'
	}

	if (lineName.includes('SL')) {
		return '0xFFC0C0C0'
	}
	if (lineName.includes('CT')) {
		return '0xFF#FFCA39'
	}
	if (isNaN(+lineName)) {
		return '0xFFA9A9A9'
	}
	switch (lineName) {
		case 'Orange Line':
			return '0xFFFF9800'
		case 'Green Line':
			return '0xFF4CAF50'
		case 'Blue Line':
			return '0xFF2196F3'
		case 'Red Line':
		case 'Mattapan':
		case 'Mattapan Trolley':
		case 'Mattapan Line':
		case 'Mattapan Trolley Line':
			return '0xFFF44336'
		default:
			return '0xFFFF9800' // TODO: fix this case (polylines case)
	}
}

function convertDirectionToName(direction: string, name: string): string {
	if (direction == 'Park Street & North') {
		return 'East'
	}

	if (name === 'Alewife') {
		return 'South'
	}

	if (name === 'Ashmont') {
		return 'North'
	}

	if (name === 'Braintree') {
		return 'North'
	}

	if (name === 'Oak Grove') {
		return 'South'
	}

	if (name === 'Forest Hills') {
		return 'North'
	}

	if (direction === 'Alewife (from Braintree)' || direction === 'Alewife (from Ashmont)') {
		return 'North'
	}

	if (
		northList.includes(direction) ||
		direction.toLowerCase().includes('north') ||
		northList
			.reduce((t1, t2) => t1.toString() + t2.toString())
			.toLowerCase()
			.includes(direction)
	) {
		return 'North'
	} else if (
		southList.includes(direction) ||
		direction.toLowerCase().includes('south') ||
		southList
			.reduce((t1, t2) => t1.toString() + t2.toString())
			.toLowerCase()
			.includes(direction)
	) {
		return 'South'
	} else if (
		eastList.includes(direction) ||
		direction.toLowerCase().includes('east') ||
		eastList
			.reduce((t1, t2) => t1.toString() + t2.toString())
			.toLowerCase()
			.includes(direction)
	) {
		return 'East'
	} else if (
		westList.includes(direction) ||
		direction.toLowerCase().includes('west') ||
		westList
			.reduce((t1, t2) => t1.toString() + t2.toString())
			.toLowerCase()
			.includes(direction)
	) {
		return 'West'
	} else {
		// TODO: will need to do something with these weird stops
		return ''
	}
}
