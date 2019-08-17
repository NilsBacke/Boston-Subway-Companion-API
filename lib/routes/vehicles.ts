import { baseURL, apiKey } from '.'
import { executeCall } from '../shared/executeCall'
import { standardUserError } from '../constants'
import { makeError } from '../models'
import { Vehicle, makeVehicle } from '../models/vehicle'

export async function vehicles(): Promise<string> {
	try {
		const url = `${baseURL}/vehicles?api_key=${apiKey}&filter[route_type]=0,1&include=route,stop&sort=label`

		const result = await executeCall(url)

		const data = result.data
		const vehicles: Vehicle[] = []

		for (var i = 0; i < data.length; i++) {
			vehicles.push(makeVehicle(result, i))
		}

		return JSON.stringify(vehicles)
	} catch (e) {
		return makeError(e.toString(), standardUserError) as string
	}
}
