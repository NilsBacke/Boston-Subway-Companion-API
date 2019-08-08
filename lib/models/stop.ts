import { northList, eastList, southList, westList } from '../constants'

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
}

export function makeStop(data: any): Stop {
	const desc = data['attributes']['description']
	const lineName = getLineName(desc)
	const directionDestination = data['attributes'].platform_name
	const directionName = convertDirectionToName(data['attributes'].platform_name)
	return {
		id: data.id,
		name: data['attributes'].name,
		latitude: data['attributes'].latitude,
		longitude: data['attributes'].longitude,
		directionDestination: directionDestination,
		directionName: directionName,
		lineName: lineName,
		textColorHex: getTextColor(lineName),
		lineColorHex: getLineColor(lineName),
		lineInitials: getLineInitials(lineName),
		directionDescription: getDirectionDescription(directionDestination, directionName)
	}
}

function getLineName(desc: string): string {
	if (desc.indexOf('-') === desc.lastIndexOf('-')) {
		// end of line stop
		return desc.substring(desc.indexOf('-'))
	}
	return desc.substring(desc.indexOf('- ') + 2, desc.lastIndexOf(' -'))
}

function getDirectionDescription(directionDestination: string, directionName: string): string {
	return directionName + 'bound towards ' + directionDestination
}

function getLineInitials(lineName: string): string {
	return lineName == 'Mattapan' ? 'M' : lineName[0].toUpperCase() + lineName[lineName.indexOf(' ') + 1].toUpperCase()
}

function getLineColor(lineName: string): string {
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

function getTextColor(lineName: string): string {
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
			return '0xFFF44336'
		default:
			return ''
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
