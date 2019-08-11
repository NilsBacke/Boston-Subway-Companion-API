import { baseURL, apiKey } from '.'
import { handleMultipleStops } from '../shared/handleMultipleStops'

const rangeInMiles = 1000

export async function nearest(locationData: any): Promise<string> {
	const radius = 0.02 * rangeInMiles

	const url = `${baseURL}/stops?api_key=${apiKey}&filter[latitude]=${locationData!.latitude}&filter[longitude]=${
		locationData!.longitude
	}&filter[radius]=${radius}&filter[route_type]=0,1&sort=distance&page[limit]=2`

	return (await handleMultipleStops(url, true)) as string
}
