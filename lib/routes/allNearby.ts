import { handleMultipleStops } from '../shared/handleMultipleStops'
import { baseURL, apiKey } from '.'

const rangeInMiles = 1000

export async function allNearby(locationData: any, range?: number): Promise<string> {
	const radius = 0.02 * (range || rangeInMiles)

	const url = `${baseURL}/stops?api_key=${apiKey}&filter[latitude]=${locationData!.latitude}&filter[longitude]=${
		locationData!.longitude
	}&filter[radius]=${radius}&filter[route_type]=0,1&sort=distance`

	return (await handleMultipleStops(url, true)) as string
}
