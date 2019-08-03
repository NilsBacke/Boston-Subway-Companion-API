import { handleMultipleStops } from '../shared/handleMultipleStops'
import { baseURL, apiKey } from '.'
import { Stop } from '../models'

export async function stopsAtSameLocation(givenStop: Stop): Promise<string> {
	const url = `${baseURL}/stops?api_key=${apiKey}&filter[latitude]=${givenStop.latitude}&filter[longitude]=${
		givenStop.longitude
	}&filter[radius]=0.001&filter[route_type]=0,1&sort=distance`

	const stops = await handleMultipleStops(url, 'GET')

	console.log(stops)

	// filter stops
	for (let i = 0; i < stops.length; i++) {
		if (stops[i].name !== givenStop.name) {
			stops.splice(i, i)
			i--
		}
	}

	console.log(stops)

	stops.sort((stop1, stop2) => stop1.lineName.localeCompare(stop2.lineName))

	// assert(stops.length == 1 || stops.length == 2 || stops.length == 4) // TODO: figure out what to do with this
	return JSON.stringify(stops)
}
