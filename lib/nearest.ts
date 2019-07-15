import { executeCall } from './shared/executeCall'
import { Location, Stop } from './models'
import { makeStop } from './models/stop'

const apiKey = 'dc44b30101114e88b45041a4a9b65e06'
const baseURL = 'https://api-v3.mbta.com'
const rangeInMiles = 100

export default async function nearest(locationData: any): Promise<string> {
	const radius = 0.02 * rangeInMiles

	// TODO: handle error of null location
	const url = `${baseURL}/stops?api_key=${apiKey}&filter[latitude]=${locationData!.latitude}&filter[longitude]=${
		locationData!.longitude
	}&filter[radius]=${radius}&filter[route_type]=0,1&sort=distance&page[limit]=2`

	const json = await executeCall(url)

	// TODO: handle error of json
	const data = json.data
	const result: Stop[] = [makeStop(data[0]), makeStop(data[1])]
	return JSON.stringify(result)
}
