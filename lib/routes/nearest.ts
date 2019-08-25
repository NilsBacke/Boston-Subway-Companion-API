import { baseURL, apiKey } from '.'
import { handleMultipleStops } from '../shared/handleMultipleStops'
import { Stop } from '../models'

const rangeInMiles = 1000

export async function nearest(locationData: any): Promise<string> {
	const radius = 0.02 * rangeInMiles

	const url = `${baseURL}/stops?api_key=${apiKey}&filter[latitude]=${locationData!.latitude}&filter[longitude]=${
		locationData!.longitude
	}&filter[radius]=${radius}&filter[route_type]=0,1&sort=distance&page[limit]=2`

	const stops = (await handleMultipleStops(url, false)) as Stop[]

	for (var i = 0; i < stops.length; i++) {
		if (['Drop-off Only', 'Exit Only'].includes(stops[i].directionDestination)) {
			stops.splice(i, i)
			i--
		}
	}

	return JSON.stringify(stops)
}
